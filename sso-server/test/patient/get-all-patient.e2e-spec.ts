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
  it('should return all patient of list', async () => {
    console.log(accessToken);
    const res = await request(app.getHttpServer())
      .get('/patient')
      .set('Authorization', `Bearer ${accessToken}`);
    console.log(res.body);
    const patients = res.body.result;
    patients.forEach((patient) => {
      expect(patient.profile.roleType.name).toBe('patient');
    });
    expect(res.status).toBe(200);
  });
});
