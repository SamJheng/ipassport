import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, MoreThanOrEqual, Raw, Repository } from 'typeorm';
import { Appointments } from '../models/Appointmets.entity';
import {
  CreateAppointmentDTO,
  GetAppointmentsDTO,
  UpdateAppointmentDTO,
} from '../models/Appointment.dto';
import { ErrorResponseResult } from '../../models/respone';
import { User } from '../../users/models/User.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointments)
    private appointmentsRepository: Repository<Appointments>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(
    createAppointmentDto: CreateAppointmentDTO,
  ): Promise<Appointments> {
    const patient = await this.usersRepository.findOne({
      where: { id: createAppointmentDto.patientId },
    });
    const doctor = await this.usersRepository.findOne({
      where: { id: createAppointmentDto.doctorId },
    });
    if (!patient) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: `Patient with ID ${createAppointmentDto.patientId} not found.`,
        error: 'An error occurred',
      });
      throw new NotFoundException(errRes);
    }
    if (!doctor) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: `Doctor with ID ${createAppointmentDto.doctorId} not found.`,
        error: 'An error occurred',
      });
      throw new NotFoundException(errRes);
    }
    const appointment =
      this.appointmentsRepository.create(createAppointmentDto);
    appointment.patient = patient;
    appointment.doctor = doctor;
    return this.appointmentsRepository.save(appointment);
  }
  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDTO,
  ): Promise<Appointments> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { id },
    });
    if (!appointment) {
      const errRes = new ErrorResponseResult({
        success: false,
        message: `Appointment with ID ${id} not found.`,
        error: 'An error occurred',
      });
      throw new NotFoundException(errRes);
    }
    const merge = this.appointmentsRepository.merge(
      appointment,
      updateAppointmentDto,
    );
    return this.appointmentsRepository.save(merge);
  }
  async getAppointments(
    queryParams: GetAppointmentsDTO,
  ): Promise<Appointments[]> {
    const { doctorId, patientId } = queryParams;
    const where: FindOptionsWhere<Appointments> = {
      ...(doctorId && { doctor: { id: doctorId } }),
      ...(patientId && { patient: { id: patientId } }),
      date: Raw((alias) => `${alias} >= CURRENT_DATE`),
    };
    const appointment = await this.appointmentsRepository.find({
      relations: ['doctor', 'patient'],
      order: { date: 'DESC' },
      where,
    });
    return appointment;
  }
}
