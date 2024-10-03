import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
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
  it('should return all doctor of list', async () => {
    console.log(accessToken);
    const res = await request(app.getHttpServer())
      .get('/doctor')
      .set('Authorization', `Bearer ${accessToken}`);
    console.log(res.body);
    const doctors = res.body.result;
    doctors.forEach((patient) => {
      expect(patient.profile.roleType.name).toBe('doctor');
    });
    expect(res.status).toBe(200);
  });
});
