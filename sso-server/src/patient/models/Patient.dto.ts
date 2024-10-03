import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from '@nestjs/class-validator';

export class PatientProfileDto {
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
