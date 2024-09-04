import { IsEmail, IsString } from '@nestjs/class-validator';

export class PatientDTO {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  username: string;
  @IsEmail()
  @IsString()
  email: string;
  profile: PatientProfileDto;
  patientInfo: PatientInfoDTO;
}
export class PatientProfileDto {
  @IsString()
  gender: string;
  @IsString()
  photo: string;
  @IsString()
  birthday: string;
}
export class PatientInfoDTO {
  @IsString()
  patientId: string;
  @IsString()
  allergies: string;
  @IsString()
  medicalHistory: string;
  @IsString()
  insuranceInformation: string;
}
