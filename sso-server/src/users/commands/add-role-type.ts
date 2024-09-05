import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccessService } from '../services/access.service';

export class AddRoleTypeCommand {
  constructor(public readonly name: string) {}
}
@CommandHandler(AddRoleTypeCommand)
export class AddRoleTypeHandler implements ICommandHandler<AddRoleTypeCommand> {
  constructor(private accessService: AccessService) {}

  async execute(command: AddRoleTypeCommand): Promise<void> {
    const r = await this.accessService.addRoleType(command.name);
  }
}
