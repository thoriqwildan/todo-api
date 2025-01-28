import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { Logger } from 'winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

describe('Todo Controller', () => {
  let app: INestApplication<App>;
  let logger: Logger
  let testService: TestService

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER)
    testService = app.get(TestService)
  });

  // Create Todo
  describe('POST /api/todos', () => {
    beforeEach(async () => {
      await testService.deleteTodo()
      await testService.deleteUser();
      await testService.createUser()
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/todos')
        .set('Authorization', 'test')
        .send({
          checklist: null,
          todoname: 'Masak ayam'
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to create todo', async () => {
      const response = await request(app.getHttpServer())
      .post('/api/todos')
      .set('Authorization', 'test')
      .send({
        checklist: false,
        todoname: 'Masak ayam'
      });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.checklist).toBe(false);
      expect(response.body.data.todoname).toBe('Masak ayam');
    });
  })

  // Get Todo
  describe('GET /api/todos', () => {
    beforeEach(async () => {
      await testService.deleteTodo()
      await testService.deleteUser();
      await testService.createUser()
      await testService.createTodo()
      await testService.createTodo()
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/todos')
        .set('Authorization', 'salah')

      logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBe('Unauthorized');
    });

    it('should be able to get todos', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/todos')
        .set('Authorization', 'test')

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  })

  // Update Todo
  describe('PUT /api/todos/:todoId', () => {
    beforeEach(async () => {
      await testService.deleteTodo()
      await testService.deleteUser();
      await testService.createUser()
      await testService.createTodo()
    });

    it('should be rejected if request is not found', async () => {
      const todo = await testService.getTodo()
      const response = await request(app.getHttpServer())
        .put(`/api/todos/${todo?.id! + 1}`)
        .set('Authorization', 'test')
        .send({
          checklist: true,
          todoname: 'Masak Ikan'
        })

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined()
    });

    it('should be able to update todo', async () => {
        const todo = await testService.getTodo()
        const response = await request(app.getHttpServer())
          .put(`/api/todos/${todo?.id}`)
          .set('Authorization', 'test')
          .send({
            checklist: true,
            todoname: 'Masak Ikan'
          })

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.checklist).toBe(true)
      expect(response.body.data.todoname).toBe('Masak Ikan')
    });
  })

  // Logout User
  describe('DELETE /api/users/current', () => {
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser()
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .delete('/api/users/current')
        .set('Authorization', 'sakah')

      logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBe('Unauthorized');
    });

    it('should be able to logout user', async () => {
      const response = await request(app.getHttpServer())
        .delete('/api/users/current')
        .set('Authorization', 'test')

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(true)
    });
  })
});
