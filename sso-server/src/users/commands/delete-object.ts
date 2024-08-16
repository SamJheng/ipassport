import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccessService } from '../services/access.service';

export class DeleteObjectCommand {
  constructor(public readonly id: string) {}
}
@CommandHandler(DeleteObjectCommand)
export class DeleteObjectHandler
  implements ICommandHandler<DeleteObjectCommand>
{
  constructor(private accessService: AccessService) {}

  async execute(command: DeleteObjectCommand): Promise<void> {
    await this.accessService.deleteObjectAccess(command.id);
  }
}
