import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccessService } from '../services/access.service';

export class UpdateObjectCommand {
  constructor(public readonly id: string, public readonly name: string) {}
}
@CommandHandler(UpdateObjectCommand)
export class UpdateObjectHandler
  implements ICommandHandler<UpdateObjectCommand>
{
  constructor(private accessService: AccessService) {}

  async execute(command: UpdateObjectCommand): Promise<void> {
    const r = await this.accessService.updateObjectAccess(
      command.id,
      command.name,
    );
  }
}
