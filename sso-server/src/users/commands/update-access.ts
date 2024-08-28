import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccessService } from '../services/access.service';

export class UpdateAccessCommand {
  constructor(
    public readonly id: string,
    public readonly objectId: string,
    public readonly roleId: string,
  ) {}
}
@CommandHandler(UpdateAccessCommand)
export class UpdateAccessHandler
  implements ICommandHandler<UpdateAccessCommand>
{
  constructor(private accessService: AccessService) {}
  async execute(command: UpdateAccessCommand) {
    const role = await this.accessService.getRoleById(command.roleId);
    const object = await this.accessService.getObjectAccessById(
      command.objectId,
    );
    const r = this.accessService.updateAccess({
      id: command.id,
      object,
      role,
    });
    return r;
  }
}
