import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EditUserDto } from '../../users/models/User.dto';
import { UsersService } from '../../users/services/users.service';

export class AddProfileCommand {
  constructor(
    public readonly id: string,
    public readonly userDto: EditUserDto,
  ) {}
}
@CommandHandler(AddProfileCommand)
export class AddProfileHandler implements ICommandHandler<AddProfileCommand> {
  constructor(private usersService: UsersService) {}
  async execute(command: AddProfileCommand): Promise<string> {
    const { id, userDto } = command;
    await this.usersService.update(id, userDto);
    return id;
  }
}
