import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { faker } from '@faker-js/faker';

describe('Add role type (e2e)', () => {
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
    accessToken = res.body.result.accessToken;
  });
  it('/access/position [doctor] (POST)', async () => {
    const data = {
      name: 'doctor',
    };
    const res = await request(app.getHttpServer())
      .post('/access/position')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201);
    return res;
  });
  it('/access/position [patient] (POST)', async () => {
    const data = {
      name: 'patient',
    };
    const res = await request(app.getHttpServer())
      .post('/access/position')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201);
    return res;
  });
  it('/access/position [staff] (POST)', async () => {
    const data = {
      name: 'staff',
    };
    const res = await request(app.getHttpServer())
      .post('/access/position')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201);
    return res;
  });
});
