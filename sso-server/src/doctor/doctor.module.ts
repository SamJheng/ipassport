import { Module } from '@nestjs/common';
import { GetDoctorHandler } from './commands/get-doctor';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../users/models/Profile.entity';
import { User } from '../users/models/User.entity';
import { UsersModule } from '../users/users.module';
import { DoctorInfo } from './models/DoctorInfo.entity';
import { DoctorController } from './controllers/doctor.controller';
import { DoctorService } from './services/doctor.service';
import { GetAllDoctorHandler } from './commands/get-all-doctor';
import { DeleteDoctorHandler } from './commands/delete-doctor';
import { UpdateDoctorHandler } from './commands/update-doctor';
import { WeeklySchedules } from './models/WeeklySchedules.entity';

const handlers = [
  GetDoctorHandler,
  GetAllDoctorHandler,
  DeleteDoctorHandler,
  UpdateDoctorHandler,
];
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, DoctorInfo, WeeklySchedules]),
    UsersModule,
    CqrsModule,
  ],
  controllers: [DoctorController],
  providers: [...handlers, DoctorService],
})
export class DoctorModule {}
