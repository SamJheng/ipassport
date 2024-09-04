import { QueryHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatientService } from '../services/patient.service';

export class GetPatientCommand {}
@QueryHandler(GetPatientCommand)
export class GetPatientHandler implements ICommandHandler<GetPatientCommand> {
  constructor(private patientService: PatientService) {}
  async execute(command: GetPatientCommand) {
    return await this.patientService.getAll();
  }
}
