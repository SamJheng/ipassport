import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../users/models/Profile.entity';
import { User } from '../users/models/User.entity';
import { PatientInfo } from './models/PatientInfo.entity';
import { GetAllPatientHandler } from './commands/get-all-patient';
import { PatientService } from './services/patient.service';
import { PatientController } from './controllers/patient.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, PatientInfo]), CqrsModule],
  controllers: [PatientController],
  providers: [GetAllPatientHandler, PatientService],
})
export class PatientModule {}
