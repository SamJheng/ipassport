import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersService } from '../../users/services/users.service';
import { ResponseResult } from '../../models/respone';

export class GetProfileCommand {
  constructor(public readonly id: string) {}
}
@QueryHandler(GetProfileCommand)
export class GetProfileHandler implements ICommandHandler<GetProfileCommand> {
  constructor(private usersService: UsersService) {}
  async execute(command: GetProfileCommand): Promise<ResponseResult> {
    const user = await this.usersService.findOne(command.id);
    const result = new ResponseResult({
      message: 'Get profile is success',
      result: user,
    });
    return result;
  }
}
