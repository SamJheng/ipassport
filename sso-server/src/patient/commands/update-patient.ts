import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePatientDTO } from '../models/Patient.dto';
import { PatientService } from '../services/patient.service';

export class UpdatePatientCommand {
  constructor(
    public readonly id: string,
    public readonly body: UpdatePatientDTO,
  ) {}
}
@CommandHandler(UpdatePatientCommand)
export class UpdatePatientHandler
  implements ICommandHandler<UpdatePatientCommand>
{
  constructor(private patientService: PatientService) {}
  async execute(command: UpdatePatientCommand): Promise<void> {
    await this.patientService.updatePatientById(command.id, command.body);
  }
}
