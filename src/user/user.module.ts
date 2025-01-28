import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "src/common/prisma.service";

@Module({
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {}