import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { faker } from '@faker-js/faker';

describe('User Module E2E Tests', () => {
  let app: INestApplication;
  let accessToken: string;

  // Before all tests, initialize the Nest application
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Before each test, log in and obtain an access token
  beforeEach(async () => {
    const loginData = {
      email: 'admin@gmail.com',
      password: 'adminPassword',
    };
    const res = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(loginData)
      .expect(200);
    accessToken = res.body.result.accessToken;
  });

  // Test case for updating user info
  it('add access to user', async () => {
    const uid = '69ae0ba1-efb5-4ad3-8f87-e86a3d78e1ab';
    const roleId = '25';
    const objectId = '8';
    const data = {
      objectId,
      roleId,
    };
    const res = await request(app.getHttpServer())
      .post('/access/user/' + uid)
      .send(data)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(201);
    console.log(res.body);
    expect(res.body).toHaveProperty('success', true);
  });

  // Clean up after all tests
  afterAll(async () => {
    await app.close();
  });
});
