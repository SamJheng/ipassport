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
  it('should return remove a patient', async () => {
    console.log(accessToken);
    const id = '354b6e0e-c5ce-475a-bf91-3b00096be6bb';
    const res = await request(app.getHttpServer())
      .delete('/patient/' + id)
      .set('Authorization', `Bearer ${accessToken}`);
    console.log(res.body);
    expect(res.status).toBe(200);
  });
});
