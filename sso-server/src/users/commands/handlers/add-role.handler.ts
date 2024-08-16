import { AccessService } from './../../services/access.service';
import { AddRolerCommand } from '../add-role.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(AddRolerCommand)
export class AddRoleHandler implements ICommandHandler<AddRolerCommand> {
  constructor(private accessService: AccessService) {}

  async execute(command: AddRolerCommand): Promise<void> {
    const r = await this.accessService.addRole(command.name);
  }
}
