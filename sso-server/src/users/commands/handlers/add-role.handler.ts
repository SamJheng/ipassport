import { AccessService } from './../../services/access.service';
import { AddRolerCommand } from '../add-role.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddObjectCommand } from '../add-object.command';

@CommandHandler(AddRolerCommand)
export class AddRoleHandler implements ICommandHandler<AddRolerCommand> {
  constructor(private accessService: AccessService) {}

  async execute(command: AddRolerCommand): Promise<void> {
    this.accessService.addRole(command.name);
  }
}
