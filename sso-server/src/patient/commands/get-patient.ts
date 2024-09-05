import { User } from '../../users/models/User.entity';
import { PatientService } from '../services/patient.service';
import { QueryHandler, ICommandHandler } from '@nestjs/cqrs';

export class GetPatientCommand {
  constructor(public readonly id: string) {}
}
@QueryHandler(GetPatientCommand)
export class GetPatientHandler implements ICommandHandler<GetPatientCommand> {
  constructor(private patientService: PatientService) {}
  async execute(command: GetPatientCommand): Promise<User> {
    const r = await this.patientService.getPatientById(command.id);
    return r;
  }
}
