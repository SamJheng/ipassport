import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from '@nestjs/class-validator';
import { AppointmentStatus } from '../../models/appointmentStatus.enum';

export class CreateAppointmentDTO {
  @IsDate()
  @IsNotEmpty()
  date: Date;
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'EndTime must be in HH:MM:SS format',
  })
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
export class GetAppointmentsDTO {
  @IsOptional()
  @IsUUID()
  doctorId?: string;

  @IsOptional()
  @IsUUID()
  patientId?: string;
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
