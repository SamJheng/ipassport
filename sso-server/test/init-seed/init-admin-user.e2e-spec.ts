import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
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

  it('/users/super/create (POST)', () => {
    const data = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      username: faker.person.fullName(),
      email: 'admin@gmail.com',
      password: 'adminPassword',
      isActive: true,
    };
    return request(app.getHttpServer())
      .post('/users/super/create')
      .send(data)
      .expect(201);
  });
});
