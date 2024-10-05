import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { faker } from '@faker-js/faker';
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
  it('should return update a doctor', async () => {
    console.log(accessToken);
    const data = {
      profile: {
        age: 30,
        gender: 'male',
        address: faker.location.city(),
        contact: '0955385557',
        photo: 'https://i.imgur.com/DGRaPQs.jpeg',
        birthday: '1993-10-12',
      },
      doctorInfo: {
        workPlace: 'City Hospital',
        specialty: 'Cardiology',
        title: 'Chief Doctor',
        education: 'MD from Harvard Medical School',
        experience: '15 years of experience in Cardiology',
        treatmentScope: 'Heart diseases, Hypertension, Angioplasty',
      },
    };
    const id = '69ae0ba1-efb5-4ad3-8f87-e86a3d78e1ab';
    const res = await request(app.getHttpServer())
      .put('/doctor/' + id)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data);
    console.log(res.body);
    expect(res.status).toBe(200);
  });
});
