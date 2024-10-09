import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DoctorService } from '../services/doctor.service';

export class RemoveScheduleCommand {
  constructor(public readonly id: string) {}
}
@CommandHandler(RemoveScheduleCommand)
export class RemoveScheduleHandler
  implements ICommandHandler<RemoveScheduleCommand>
{
  constructor(private service: DoctorService) {}
  async execute(command: RemoveScheduleCommand): Promise<void> {
    await this.service.removeDoctorSchedule(command.id);
  }
}
