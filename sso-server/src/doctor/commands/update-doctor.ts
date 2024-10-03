import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateDoctorDTO } from '../models/Doctor.dto';
import { DoctorService } from '../services/doctor.service';

export class UpdateDoctorCommand {
  constructor(
    public readonly id: string,
    public readonly body: UpdateDoctorDTO,
  ) {}
}

@CommandHandler(UpdateDoctorCommand)
export class UpdateDoctorHandler
  implements ICommandHandler<UpdateDoctorCommand>
{
  constructor(private service: DoctorService) {}
  async execute(command: UpdateDoctorCommand): Promise<void> {
    await this.service.updateDoctorById(command.id, command.body);
  }
}
