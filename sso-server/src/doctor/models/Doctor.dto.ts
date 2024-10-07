import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from '@nestjs/class-validator';
import { DayOfWeek } from '../../models/day-of-week.enum';

export class DoctorProfileDTO {
  @IsNumber()
  @IsNotEmpty()
  age: number;
  @IsString()
  @IsNotEmpty()
  gender: string;
  @IsString()
  photo: string;
  @IsString()
  @IsNotEmpty()
  birthday: string;
  @IsString()
  @IsNotEmpty()
  contact: string;
  @IsString()
  address: string;
}

export class DoctorInfoDTO {
  @IsString()
  @IsNotEmpty()
  workPlace: string;
  @IsString()
  @IsNotEmpty()
  specialty: string;
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  education: string;
  @IsString()
  @IsNotEmpty()
  experience: string;
  @IsString()
  @IsNotEmpty()
  treatmentScope: string;
  weeklySchedules: WeeklySchedulesDTO[];
}
export class WeeklySchedulesDTO {
  @IsOptional()
  @IsNumber()
  id?: number;
  @IsEnum(DayOfWeek, { message: 'DayOfWeek must be a valid day of the week' })
  DayOfWeek: DayOfWeek;

  @IsNotEmpty({ message: 'StartTime is required' })
  @IsString({ message: 'StartTime must be a string' })
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'StartTime must be in HH:MM:SS format',
  })
  StartTime: string;

  @IsNotEmpty({ message: 'EndTime is required' })
  @IsString({ message: 'EndTime must be a string' })
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'EndTime must be in HH:MM:SS format',
  })
  EndTime: string;
}
export class UpdateDoctorDTO {
  profile: DoctorProfileDTO;
  doctorInfo: DoctorInfoDTO;
}
