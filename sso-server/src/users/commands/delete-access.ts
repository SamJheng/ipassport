import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccessService } from '../services/access.service';

export class DeleteAccessCommand {
  constructor(public readonly id: string) {}
}
@CommandHandler(DeleteAccessCommand)
export class DeleteAccessHandler
  implements ICommandHandler<DeleteAccessCommand>
{
  constructor(private accessService: AccessService) {}

  async execute(command: DeleteAccessCommand): Promise<void> {
    await this.accessService.deleteAccess(command.id);
  }
}
