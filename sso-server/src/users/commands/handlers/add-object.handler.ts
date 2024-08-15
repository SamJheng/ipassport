import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddObjectCommand } from '../add-object.command';

@CommandHandler(AddObjectCommand)
export class AddObjectHandler implements ICommandHandler<AddObjectCommand> {
  constructor() {}

  async execute(command: AddObjectCommand): Promise<void> {}
}
