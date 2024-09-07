import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RoleType } from '../models/RoleType.entity';
import { UsersService } from '../services/users.service';

export class UpdateUserRoleTypeCommand {
  constructor(public readonly id: string, public readonly roleType: RoleType) {}
}
@CommandHandler(UpdateUserRoleTypeCommand)
export class UpdateUserRoleTypeHandler
  implements ICommandHandler<UpdateUserRoleTypeCommand>
{
  constructor(private usersService: UsersService) {}
  async execute(command: UpdateUserRoleTypeCommand) {
    await this.usersService.updateUserRoleType(command.id, command.roleType);
  }
}
