import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAppointmentDTO } from '../models/Appointment.dto';
import { AppointmentsService } from '../services/appointments.service';
import { Appointments } from '../models/Appointmets.entity';

export class UpdateAppointmentCommand {
  constructor(
    public readonly id: string,
    public readonly update: UpdateAppointmentDTO,
  ) {}
}
@CommandHandler(UpdateAppointmentCommand)
export class UpdateAppointmentHandler
  implements ICommandHandler<UpdateAppointmentCommand>
{
  constructor(private service: AppointmentsService) {}
  async execute(command: UpdateAppointmentCommand): Promise<Appointments> {
    const r = await this.service.update(command.id, command.update);
    return r;
  }
}
