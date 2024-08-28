import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccessService } from '../services/access.service';
import { UsersService } from '../services/users.service';

export class AddAccessCommand {
  constructor(
    public readonly userId: string,
    public readonly objectId: string,
    public readonly roleId: string,
  ) {}
}
@CommandHandler(AddAccessCommand)
export class AddAccessHandler implements ICommandHandler<AddAccessCommand> {
  constructor(
    private accessService: AccessService,
    private usersService: UsersService,
  ) {}

  async execute(command: AddAccessCommand): Promise<void> {
    const user = await this.usersService.findOne(command.userId);
    const role = await this.accessService.getRoleById(command.roleId);
    const object = await this.accessService.getObjectAccessById(
      command.objectId,
    );
    const access = await this.accessService.grantingAccess({
      user,
      role,
      object,
    });
    console.log(access);
  }
}
