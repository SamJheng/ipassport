import { IsEmail, IsNumber, IsString } from '@nestjs/class-validator';

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
  @IsNumber()
  age: number;
  @IsString()
  gender: string;
  @IsString()
  photo: string;
  @IsString()
  birthday: string;
  @IsString()
  contact: string;
  @IsString()
  address: string;
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
export class UpdatePatientDTO {
  profile: PatientProfileDto;
  patientInfo: PatientInfoDTO;
}
