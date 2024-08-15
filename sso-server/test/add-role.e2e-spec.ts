import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { faker } from '@faker-js/faker';

describe('Add role (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const data = {
      email: 'admin@gmail.com',
      password: 'adminPassword',
    };
    const res = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(data);
    accessToken = res.body.accessToken;
  });
  it('/users/role [editor] (POST)', async () => {
    const data = {
      name: 'editor',
    };
    const res = await request(app.getHttpServer())
      .post('/users/role')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201);
    return res;
  });
  it('/users/role [reader] (POST)', async () => {
    const data = {
      name: 'reader',
    };
    const res = await request(app.getHttpServer())
      .post('/users/role')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201);
    return res;
  });
  it('/users/role [guest] (POST)', async () => {
    const data = {
      name: 'guest',
    };
    const res = await request(app.getHttpServer())
      .post('/users/role')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201);
    return res;
  });
  it('/users/role [*] (POST)', async () => {
    const data = {
      name: '*',
    };
    const res = await request(app.getHttpServer())
      .post('/users/role')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201);
    return res;
  });
});
