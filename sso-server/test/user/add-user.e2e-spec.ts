import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { faker } from '@faker-js/faker';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  // Set up the application before all tests
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Tear down the application after all tests
  afterAll(async () => {
    await app.close();
  });

  it('/auth/signup (POST) - should sign up a new user successfully', async () => {
    const data = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      username: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'Passwrod12345',
      isActive: false,
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(data)
      .expect(201); // Assuming signup success returns 201 for resource creation

    // Assertions to verify the response structure and content
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('result');
    expect(response.body.result).toHaveProperty('id'); // Assuming the response includes a generated user ID
    expect(response.body.result).toHaveProperty('email', data.email);
    expect(response.body.result).toHaveProperty('username', data.username);
    expect(response.body.result).toHaveProperty('isActive', data.isActive);
    expect(response.body.result).toHaveProperty('firstName', data.firstName);
    expect(response.body.result).toHaveProperty('lastName', data.lastName);
  });

  it('/auth/signup (POST) - should fail if email already exists (409)', async () => {
    const data = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      username: faker.person.fullName(),
      email: 'admin@gmail.com', // Reusing the same email to simulate duplicate
      password: 'adminPassword',
      isActive: false,
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(data)
      .expect(409);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty(
      'message',
      'admin@gmail.com already exists.',
    );
    // Assertions to check for a failure response due to a duplicate email
  });
  it('/auth/signup (POST) - should fail if bad request (400)', async () => {
    const data = {};

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(data)
      .expect(400);
    expect(response.body).toHaveProperty('success', false);
    // Assertions to check for a failure response due to a duplicate email
  });
});
