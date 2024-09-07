import { QueryHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccessService } from '../services/access.service';
import { RoleType } from '../models/RoleType.entity';

export class GetAllRoleTypeCommand {}
@QueryHandler(GetAllRoleTypeCommand)
export class GetAllRoleTypeHandler
  implements ICommandHandler<GetAllRoleTypeCommand>
{
  constructor(private accessService: AccessService) {}
  async execute(command: GetAllRoleTypeCommand): Promise<RoleType[]> {
    const all = await this.accessService.getAllRoleType();
    return all;
  }
}
