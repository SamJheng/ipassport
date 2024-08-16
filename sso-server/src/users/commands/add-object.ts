import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccessService } from '../services/access.service';

export class AddObjectCommand {
  constructor(public readonly name: string) {}
}
@CommandHandler(AddObjectCommand)
export class AddObjectHandler implements ICommandHandler<AddObjectCommand> {
  constructor(private accessService: AccessService) {}

  async execute(command: AddObjectCommand): Promise<void> {
    const r = await this.accessService.addObjectAccess(command.name);
  }
}
