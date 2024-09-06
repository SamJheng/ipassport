import { ObjectAccess } from './../../models/ObjectAccess.entity';
import { Role } from './Role.entity';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';
import { ExternalType } from './SocialExternalProviders.entity';
import { User } from './User.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsOptional()
  password?: string;
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
export class CreateExternalUserDto {
  @IsNotEmpty()
  @IsNumber()
  user: User;
  @IsNotEmpty()
  @IsNumber()
  externalType: ExternalType;
  email: string;
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  providerId: string;
  @IsNotEmpty()
  @IsString()
  picture: string;
  @IsNotEmpty()
  @IsBoolean()
  emailVerified: boolean;
  @IsNotEmpty()
  @IsString()
  locale: string;
}

export class EditUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  username: string;
  @IsEmail()
  @IsString()
  email: string;
  @IsBoolean()
  active: boolean;
  profile: EditUserProfileDto;
}
export class EditUserProfileDto {
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

// export class ExternalUserRedirectDto {
//   @ApiProperty()
//   user: User;
//   @ApiProperty()
//   accessToken: string;
//   @ApiProperty()
//   provider: SocialExternalProviders;
// }
