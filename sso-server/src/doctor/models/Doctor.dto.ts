import { IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';

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
}
export class UpdateDoctorDTO {
  profile: DoctorProfileDTO;
  doctorInfo: DoctorInfoDTO;
}
