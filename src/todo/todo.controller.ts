import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Auth } from 'src/common/auth.decorator';
import { User } from '@prisma/client';
import {
  CreateTodoRequest,
  TodoResponse,
  UpdateTodoRequest,
} from 'src/model/todo.model';
import { WebResponse } from 'src/model/web.model';

@Controller('/api/todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Auth() user: User,
    @Body() request: CreateTodoRequest,
  ): Promise<WebResponse<TodoResponse>> {
    const result = await this.todoService.create(user, request);

    return {
      data: result,
    };
  }

  @Get()
  @HttpCode(200)
  async get(@Auth() user: User): Promise<WebResponse<TodoResponse[]>> {
    const result = await this.todoService.get(user);

    return {
      data: result,
    };
  }

  @Put('/:todoId')
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Param('todoId', ParseIntPipe) todo_id: number,
    @Body() request: UpdateTodoRequest,
  ): Promise<WebResponse<TodoResponse>> {
    request.id = todo_id;
    const result = await this.todoService.update(user, request);

    return {
      data: result,
    };
  }

  @Delete('/:todoId')
  @HttpCode(200)
  async remove(
    @Auth() user: User,
    @Param('todoId', ParseIntPipe) todo_id: number,
  ): Promise<WebResponse<boolean>> {
    const result = await this.todoService.remove(user, todo_id);

    return {
      data: true,
    };
  }
}
