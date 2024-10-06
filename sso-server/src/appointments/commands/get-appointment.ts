import { CommandHandler, ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAppointmentsDTO } from '../models/Appointment.dto';
import { AppointmentsService } from '../services/appointments.service';
import { Appointments } from '../models/Appointmets.entity';

export class GetAppointmentCommand {
  constructor(public readonly query: GetAppointmentsDTO) {}
}
@QueryHandler(GetAppointmentCommand)
export class GetAppointmentHandler
  implements ICommandHandler<GetAppointmentCommand>
{
  constructor(private service: AppointmentsService) {}
  async execute(command: GetAppointmentCommand): Promise<Appointments[]> {
    const r = await this.service.getAppointments(command.query);
    return r;
  }
}
