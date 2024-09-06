import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../users/models/Profile.entity';
import { User } from '../users/models/User.entity';
import { PatientInfo } from './models/PatientInfo.entity';
import { GetAllPatientHandler } from './commands/get-all-patient';
import { PatientService } from './services/patient.service';
import { PatientController } from './controllers/patient.controller';
import { GetPatientHandler } from './commands/get-patient';
import { DeletePatientHandler } from './commands/delete-patient';
import { UpdatePatientHandler } from './commands/update-patient';
import { UsersModule } from '../users/users.module';
const handlers = [
  DeletePatientHandler,
  GetAllPatientHandler,
  GetPatientHandler,
  UpdatePatientHandler,
];
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, PatientInfo]),
    UsersModule,
    CqrsModule,
  ],
  controllers: [PatientController],
  providers: [...handlers, PatientService],
})
export class PatientModule {}
