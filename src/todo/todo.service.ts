import { Inject, Injectable } from "@nestjs/common";
import { Todo, User } from "@prisma/client";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "src/common/prisma.service";
import { ValidationService } from "src/common/validation.service";
import { CreateTodoRequest, TodoResponse } from "src/model/todo.model";
import { Logger } from "winston";
import { TodoValidation } from "./todo.validation";

@Injectable()
export class TodoService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
        private validationService: ValidationService
    ) {}

    toTodoResponse(todo: Todo): TodoResponse {
        return {
            id: todo.id,
            checklist: todo.checklist,
            todoname: todo.todoname
        }
    }

    async create(user: User, request: CreateTodoRequest): Promise<TodoResponse> {
        const createRequest: CreateTodoRequest = this.validationService.validate(TodoValidation.CREATE, request)

        const todo = await this.prismaService.todo.create({
            data: {
                ...createRequest,
                ...{username: user.username}
            }
        })

        return this.toTodoResponse(todo)
    }

    async get(user: User): Promise<TodoResponse[]> {
        const todoList = await this.prismaService.todo.findMany({
            where: {
                username: user.username
            }
        })

        return todoList.map((todo) => this.toTodoResponse(todo))
    }

}