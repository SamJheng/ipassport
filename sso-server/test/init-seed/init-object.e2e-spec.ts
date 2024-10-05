import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Add object access (e2e)', () => {
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
  it('/access/object [user] [POST]', async () => {
    const data = {
      name: 'user',
    };
    const res = await request(app.getHttpServer())
      .post('/access/object')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201);
    return res;
  });
  it('/access/object [access] [POST]', async () => {
    const data = {
      name: 'access',
    };
    const res = await request(app.getHttpServer())
      .post('/access/object')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201);
    return res;
  });
  it('/access/object [patient] [POST]', async () => {
    const data = {
      name: 'patient',
    };
    const res = await request(app.getHttpServer())
      .post('/access/object')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201);
    return res;
  });
  it('/access/appointments [appointments] [POST]', async () => {
    const data = {
      name: 'appointments',
    };
    const res = await request(app.getHttpServer())
      .post('/access/object')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201);
    return res;
  });
  it('/access/object [*] [POST]', async () => {
    const data = {
      name: '*',
    };
    const res = await request(app.getHttpServer())
      .post('/access/object')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .expect(201);
    return res;
  });
});
