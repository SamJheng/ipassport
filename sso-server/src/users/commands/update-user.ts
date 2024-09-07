import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EditUserDto } from '../models/User.dto';
import { UsersService } from '../services/users.service';

export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly userDto: EditUserDto,
  ) {}
}
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private usersService: UsersService) {}
  async execute(command: UpdateUserCommand) {
    const { id, userDto } = command;
    // const user = await this.usersService.findOne(id);
    await this.usersService.update(id, userDto);
    return id;
  }
}
