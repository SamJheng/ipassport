import { QueryHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatientService } from '../services/patient.service';

export class GetAllPatientCommand {}
@QueryHandler(GetAllPatientCommand)
export class GetAllPatientHandler
  implements ICommandHandler<GetAllPatientCommand>
{
  constructor(private patientService: PatientService) {}
  async execute(command: GetAllPatientCommand) {
    return await this.patientService.getAll();
  }
}
