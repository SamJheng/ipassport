import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
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

  it('/auth/signup (POST)', () => {
    const data = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      username: faker.person.fullName(),
      email: 'admin@gmail.com',
      password: 'adminPassword',
      isActive: false,
    };
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(data)
      .expect(200);
  });
});
