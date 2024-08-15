import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { faker } from '@faker-js/faker';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signin (POST)', () => {
    const data = {
      email: 'Kraig.Emmerich-Ondricka34@hotmail.com',
      password: 'adminPassword',
    };
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send(data)
      .expect(200);
  });
});
