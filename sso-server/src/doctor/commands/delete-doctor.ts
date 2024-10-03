import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DoctorService } from '../services/doctor.service';

export class DeleteDoctorCommand {
  constructor(public readonly id: string) {}
}
@CommandHandler(DeleteDoctorCommand)
export class DeleteDoctorHandler
  implements ICommandHandler<DeleteDoctorCommand>
{
  constructor(private service: DoctorService) {}
  async execute(command: DeleteDoctorCommand): Promise<void> {
    await this.service.removeDoctorById(command.id);
  }
}
