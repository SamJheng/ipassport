import { QueryHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccessService } from '../services/access.service';
import { Access } from '../models/Access.entity';

export class GetAccessCommand {
  constructor(public readonly userid: string) {}
}
@QueryHandler(GetAccessCommand)
export class GetAccessHandler implements ICommandHandler<GetAccessCommand> {
  constructor(private accessService: AccessService) {}
  async execute(command: GetAccessCommand): Promise<Access[]> {
    return await this.accessService.getAccessByUserId(command.userid);
  }
}
