import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddObjectCommand } from '../add-object.command';
import { AccessService } from '../../services/access.service';
@CommandHandler(AddObjectCommand)
export class AddObjectHandler implements ICommandHandler<AddObjectCommand> {
  constructor(private accessService: AccessService) {}

  async execute(command: AddObjectCommand): Promise<void> {
    const r = await this.accessService.addObjectAccess(command.name);
  }
}
