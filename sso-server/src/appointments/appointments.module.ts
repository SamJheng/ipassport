import { Module } from '@nestjs/common';
import { Appointments } from './models/Appointmets.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { AppointmentsService } from './services/appointments.service';
import { CreateAppointmentHandler } from './commands/create-appointment';
import { UpdateAppointmentHandler } from './commands/update-appointment';
import { AppointmentsController } from './controllers/appointments.controller';
const handlers = [CreateAppointmentHandler, UpdateAppointmentHandler];
@Module({
  imports: [TypeOrmModule.forFeature([Appointments]), CqrsModule],
  providers: [AppointmentsService, ...handlers],
  controllers: [AppointmentsController],
})
export class AppointmentsModule {}
