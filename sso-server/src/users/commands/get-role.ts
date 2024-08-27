import { QueryHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccessService } from '../services/access.service';
import { Role } from '../models/Role.entity';

export class GetRoleCommand {}
@QueryHandler(GetRoleCommand)
export class GetRoleHandler implements ICommandHandler<GetRoleCommand> {
  constructor(private accessService: AccessService) {}
  async execute(command: GetRoleCommand): Promise<Role[]> {
    const r = this.accessService.getAllRole();
    return r;
  }
}
