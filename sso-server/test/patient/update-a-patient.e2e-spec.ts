import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { faker } from '@faker-js/faker';
describe('Description', () => {
  let app: INestApplication;
  let accessToken: string;
  const diseases = [
    'Diabetes',
    'Hypertension',
    'Asthma',
    'Chronic Bronchitis',
    'Heart Disease',
    'Cancer',
    'Arthritis',
    'Migraine',
    'Kidney Disease',
    'Hepatitis',
  ];
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
  it('should return update a patient', async () => {
    console.log(accessToken);
    const data = {
      profile: {
        age: 37,
        gender: faker.person.gender(),
        address: faker.location.city(),
        contact: faker.location.city(),
        photo: 'https://i.imgur.com/DGRaPQs.jpeg',
        birthday: '1985-05-20',
      },
      patientInfo: {
        patientId: faker.number.binary({ min: 0, max: 99999999 }),
        allergies: faker.helpers.arrayElement(diseases),
        medicalHistory: faker.helpers.arrayElement(diseases),
        insuranceInformation: 'Insurance Company XYZ, Policy #67890',
      },
    };
    const id = '354b6e0e-c5ce-475a-bf91-3b00096be6bb';
    const res = await request(app.getHttpServer())
      .put('/patient/' + id)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data);
    console.log(res.body);
    expect(res.status).toBe(200);
  });
});
