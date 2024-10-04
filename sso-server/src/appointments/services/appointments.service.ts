import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointments } from '../models/Appointmets.entity';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from '../models/Appointment.dto';
import { ErrorResponseResult } from '../../models/respone';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointments)
    private appointmentsRepository: Repository<Appointments>,
  ) {}
  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointments> {
    const appointment =
      this.appointmentsRepository.create(createAppointmentDto);
    return this.appointmentsRepository.save(appointment);
  }
  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
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
}
