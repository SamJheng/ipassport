import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { faker } from '@faker-js/faker';

describe('User Module E2E Tests', () => {
  let app: INestApplication;
  let accessToken: string;

  // Before all tests, initialize the Nest application
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Before each test, log in and obtain an access token
  beforeEach(async () => {
    const loginData = {
      email: 'admin@gmail.com',
      password: 'adminPassword',
    };
    const res = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(loginData)
      .expect(200);
    accessToken = res.body.result.accessToken;
  });

  // Test case for updating user info
  it('should update user info successfully', async () => {
    const uid = '91bcfbfc-429c-499b-9272-d48f1dbcd97e';
    const first = faker.person.firstName();
    const last = faker.person.lastName(); // Use faker.person.lastName() for last name instead of firstName()
    const data = {
      firstName: first,
      lastName: last,
      username: `${first} ${last}`,
      email: 'admin@gmail.com',
      isActive: true,
      profile: {
        gender: 'female',
        photo: 'https://i.imgur.com/oNbzQdR.jpeg',
      },
    };

    const res = await request(app.getHttpServer())
      .put('/users/' + uid)
      .send(data)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    // Add assertions to verify the response
    expect(res.body).toHaveProperty('success', true);
  });

  // Clean up after all tests
  afterAll(async () => {
    await app.close();
  });
});
