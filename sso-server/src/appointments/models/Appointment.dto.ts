import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from '@nestjs/class-validator';
import { AppointmentStatus } from '../../models/appointmentStatus.enum';

export class CreateAppointmentDTO {
  @IsDate()
  @IsNotEmpty()
  date: Date;
  @IsString()
  @IsNotEmpty()
  time: string;
  @IsEnum(AppointmentStatus)
  @IsNotEmpty()
  status: AppointmentStatus;
  @IsString()
  @IsNotEmpty()
  notes: string;
  @IsNotEmpty()
  @IsUUID()
  doctorId: string;
  @IsNotEmpty()
  @IsUUID()
  patientId: string;
}
export class UpdateAppointmentDTO {
  @IsDate()
  @IsOptional()
  date?: Date;
  @IsString()
  @IsOptional()
  time?: string;
  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;
  @IsString()
  @IsOptional()
  notes?: string;
}
