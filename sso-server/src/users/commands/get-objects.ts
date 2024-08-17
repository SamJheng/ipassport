import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { AccessService } from '../services/access.service';
import { ObjectAccess } from '../../models/ObjectAccess.entity';
export class GetObjectsCommand {}
@QueryHandler(GetObjectsCommand)
export class GetObjectsHandler implements ICommandHandler<GetObjectsCommand> {
  constructor(private accessService: AccessService) {}

  async execute(command: GetObjectsCommand): Promise<ObjectAccess[]> {
    return await this.accessService.getObjects();
  }
}
