import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
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
  it('update access to test *', async () => {
    const uid = '69ae0ba1-efb5-4ad3-8f87-e86a3d78e1ab';
    const roleId = '25';
    const objectId = '15';
    const id = '44';
    const data = {
      id,
      objectId,
      roleId,
    };
    const res = await request(app.getHttpServer())
      .put('/access/user/' + uid)
      .send(data)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
    // console.log(res.body);
    expect(res.body.result).toBeDefined();
    expect(res.body.result.object.id).toEqual(parseInt(objectId));
    expect(res.body).toHaveProperty('success', true);
  });
  it('update access to access *', async () => {
    const uid = '69ae0ba1-efb5-4ad3-8f87-e86a3d78e1ab';
    const roleId = '25';
    const objectId = '13';
    const id = '44';
    const data = {
      id,
      objectId,
      roleId,
    };
    const res = await request(app.getHttpServer())
      .put('/access/user/' + uid)
      .send(data)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
    // console.log(res.body);
    expect(res.body.result).toBeDefined();
    expect(res.body.result.object.id).toEqual(parseInt(objectId));
    expect(res.body).toHaveProperty('success', true);
  });

  // Clean up after all tests
  afterAll(async () => {
    await app.close();
  });
});
