import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatientService } from '../services/patient.service';

export class DeletePatientCommand {
  constructor(public readonly id: string) {}
}
@CommandHandler(DeletePatientCommand)
export class DeletePatientHandler
  implements ICommandHandler<DeletePatientCommand>
{
  constructor(private patientService: PatientService) {}
  async execute(command: DeletePatientCommand): Promise<void> {
    await this.patientService.removePatientById(command.id);
  }
}
