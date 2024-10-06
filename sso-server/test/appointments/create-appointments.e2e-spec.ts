import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Description', () => {
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
  it('should return create a appointment', async () => {
    console.log(accessToken);
    const data = {
      date: '2024-10-20T00:00:00Z',
      time: '14:30',
      status: 'PENDING',
      notes: 'Patient requests early checkup due to symptoms.',
      doctorId: '69ae0ba1-efb5-4ad3-8f87-e86a3d78e1ab',
      patientId: '092aa64c-ab4b-48a6-b555-9a42bd9ba7fa',
    };
    const res = await request(app.getHttpServer())
      .post('/appointment')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data);
    console.log(res.body);
    expect(res.status).toBe(201);
  });
});
