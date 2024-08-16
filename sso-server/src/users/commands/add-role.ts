import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccessService } from '../services/access.service';

export class AddRolerCommand {
  constructor(public readonly name: string) {}
}

@CommandHandler(AddRolerCommand)
export class AddRoleHandler implements ICommandHandler<AddRolerCommand> {
  constructor(private accessService: AccessService) {}

  async execute(command: AddRolerCommand): Promise<void> {
    const r = await this.accessService.addRole(command.name);
  }
}
