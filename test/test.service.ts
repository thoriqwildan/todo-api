import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'test',
      },
    });
  }

  async createUser() {
    await this.prismaService.user.create({
      data: {
        username: 'test',
        name: 'test',
        password: await bcrypt.hash('test', 15),
        token: 'test',
      },
    });
  }

  async deleteTodo() {
    await this.prismaService.todo.deleteMany({
      where: {
        username: 'test',
      },
    });
  }

  async createTodo() {
    await this.prismaService.todo.create({
      data: {
        checklist: false,
        todoname: 'Masak ayam',
        username: 'test',
      },
    });
  }

  async getTodo() {
    return await this.prismaService.todo.findFirst({
      where: {
        username: 'test',
      },
    });
  }
}
