import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAppointmentDto } from '../models/Appointment.dto';
import { AppointmentsService } from '../services/appointments.service';

export class CreateAppointmentCommand {
  constructor(public readonly create: CreateAppointmentDto) {}
}
@CommandHandler(CreateAppointmentCommand)
export class CreateAppointmentHandler
  implements ICommandHandler<CreateAppointmentCommand>
{
  constructor(private service: AppointmentsService) {}
  async execute(command: CreateAppointmentCommand): Promise<void> {
    await this.service.create(command.create);
  }
}
