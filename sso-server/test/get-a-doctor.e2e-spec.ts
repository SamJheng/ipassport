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
  it('should return a doctor', async () => {
    console.log(accessToken);
    const id = '69ae0ba1-efb5-4ad3-8f87-e86a3d78e1ab';
    const res = await request(app.getHttpServer())
      .get('/doctor/' + id)
      .set('Authorization', `Bearer ${accessToken}`);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.result.id).toEqual(id);
  });
});
