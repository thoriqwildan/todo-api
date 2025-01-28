import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { Auth } from "src/common/auth.decorator";
import { User } from "@prisma/client";
import { CreateTodoRequest, TodoResponse } from "src/model/todo.model";
import { WebResponse } from "src/model/web.model";

@Controller('/api/todos')
export class TodoController {
    constructor(private todoService: TodoService) {}

    @Post()
    @HttpCode(200)
    async create(@Auth() user: User, @Body() request: CreateTodoRequest): Promise<WebResponse<TodoResponse>> {
        const result = await this.todoService.create(user, request)

        return {
            data: result
        }
    }

    @Get()
    @HttpCode(200)
    async get(@Auth() user: User): Promise<WebResponse<TodoResponse[]>> {
        const result = await this.todoService.get(user)

        return {
            data: result
        }
    }
}