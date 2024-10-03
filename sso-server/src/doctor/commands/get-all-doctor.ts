import { QueryHandler, ICommandHandler } from '@nestjs/cqrs';
import { DoctorService } from '../services/doctor.service';
import { User } from '../../users/models/User.entity';

export class GetAllDoctorCommand {}
@QueryHandler(GetAllDoctorCommand)
export class GetAllDoctorHandler
  implements ICommandHandler<GetAllDoctorCommand>
{
  constructor(private service: DoctorService) {}
  async execute(command: GetAllDoctorCommand): Promise<User[]> {
    return await this.service.getAll();
  }
}
