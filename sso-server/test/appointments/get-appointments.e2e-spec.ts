import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Description', () => {
  let app: INestApplication;
  let accessToken: string;
  const doctorId = '69ae0ba1-efb5-4ad3-8f87-e86a3d78e1ab';
  const patientId = '092aa64c-ab4b-48a6-b555-9a42bd9ba7fa';
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
  it('should return get appointment', async () => {
    const res = await request(app.getHttpServer())
      .get(`/appointment?doctorId=${doctorId}&patientId=${patientId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.result).toBeInstanceOf(Array);
    res.body.result.forEach((appointment) => {
      expect(appointment.doctor.id).toBe(doctorId);
      expect(appointment.patient.id).toBe(patientId);
    });
  });
  it('should return get appointment by doctorId', async () => {
    const res = await request(app.getHttpServer())
      .get(`/appointment?doctorId=${doctorId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.result).toBeInstanceOf(Array);
    res.body.result.forEach((appointment) => {
      expect(appointment.doctor.id).toBe(doctorId);
    });
  });
  it('should return get appointment by patientId', async () => {
    const res = await request(app.getHttpServer())
      .get(`/appointment?patientId=${patientId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.result).toBeInstanceOf(Array);
    res.body.result.forEach((appointment) => {
      expect(appointment.patient.id).toBe(patientId);
    });
  });
  it('should return appointment is invalid doctorId and patientId', async () => {
    const invalidDoctorId = 'invalid-doctor-id';
    const invalidPatientId = 'invalid-patient-id';

    const res = await request(app.getHttpServer())
      .get(
        `/appointment?doctorId=${invalidDoctorId}&patientId=${invalidPatientId}`,
      )
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(500);
  });
  afterAll(async () => {
    await app.close();
  });
});
