import { User } from '../../users/models/User.entity';
import { QueryHandler, ICommandHandler } from '@nestjs/cqrs';
import { DoctorService } from '../services/doctor.service';

export class GetDoctorCommand {
  constructor(public readonly id: string) {}
}
@QueryHandler(GetDoctorCommand)
export class GetDoctorHandler implements ICommandHandler<GetDoctorCommand> {
  constructor(private service: DoctorService) {}
  async execute(command: GetDoctorCommand): Promise<User> {
    const user = await this.service.getDoctorById(command.id);
    return user;
  }
}
