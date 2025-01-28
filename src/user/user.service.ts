import { HttpException, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "src/common/prisma.service";
import { ValidationService } from "src/common/validation.service";
import { LoginUserRequest, RegisterUserRequest, UpdateUserRequest, UserResponse } from "src/model/user.model";
import { Logger } from "winston";
import { UserValidation } from "./user.validation";
import * as bcrypt from 'bcrypt'
import { v4 as uuid } from "uuid";
import { User } from "@prisma/client";

@Injectable()
export class UserService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
        private validationService: ValidationService
    ) {}

    async register(request: RegisterUserRequest): Promise<UserResponse> {
        const registerRequest: RegisterUserRequest = this.validationService.validate(UserValidation.REGISTER, request)

        const totalWithSameUsername = await this.prismaService.user.count({
            where: {
                username: registerRequest.username
            }
        })

        if (totalWithSameUsername != 0) {
            throw new HttpException('Username already registered', 400)
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 15)

        const user = await this.prismaService.user.create({
            data: registerRequest
        })

        return {
            username: user.username,
            name: user.name
        }
    }

    async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest: LoginUserRequest = this.validationService.validate(UserValidation.LOGIN, request)

        let user = await this.prismaService.user.findUnique({
            where: {
                username: loginRequest.username
            }
        })

        if (!user) { throw new HttpException('Username or Password wrong!', 401) }

        const ifPasswordValid = await bcrypt.compare(loginRequest.password, user.password)

        if (!ifPasswordValid) { 
            this.logger.debug(`Error di password comparenya`)
            throw new HttpException('Username or Password wrong!', 401)
        }

        user = await this.prismaService.user.update({
            where: {
                username: loginRequest.username
            },
            data: {
                token: uuid()
            }
        })

        return {
            username: user.username,
            name: user.name,
            token: user.token!
        }
    }

    async get(user: User): Promise<UserResponse> {
        return {
            username: user.username,
            name: user.name
        }
    }

    async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
        this.logger.debug(`UserService.update(${user.username}, ${request})`)
        const updateRequest: UpdateUserRequest = this.validationService.validate(UserValidation.UPDATE, request)

        if (updateRequest.name) {
            user.name = updateRequest.name
        }

        if (updateRequest.password) {
            user.password = await bcrypt.hash(updateRequest.password, 15)
        }

        const result = await this.prismaService.user.update({
            where: {
                username: user.username
            },
            data: user
        })

        return {
            username: result.username,
            name: result.name
        }
    }
}