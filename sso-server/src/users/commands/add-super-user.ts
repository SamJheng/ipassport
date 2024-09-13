import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserDto } from '../models/User.dto';
import { AccessService } from '../services/access.service';
import { UsersService } from '../services/users.service';
import { ConfigService } from '@nestjs/config';
import { ErrorResponseResult } from '../../models/respone';
import { HttpException, HttpStatus } from '@nestjs/common';

export class AddSuperUserCommand {
  constructor(public user: CreateUserDto) {}
}
@CommandHandler(AddSuperUserCommand)
export class AddSuperUserHandler
  implements ICommandHandler<AddSuperUserCommand>
{
  constructor(
    private accessService: AccessService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}
  async execute(command: AddSuperUserCommand) {
    const { password } = command.user;
    const configPassword = this.configService.get<string>('SUPER_PASSWORD');
    if (password !== configPassword) {
      const errRes = new ErrorResponseResult({
        success: false,
        message:
          'Create super user is fail because password is dismatch, Please check again!',
      });
      throw new HttpException(errRes, HttpStatus.BAD_REQUEST);
    }
    const role = await this.accessService.addObjectAccess('*');
    const object = await this.accessService.addRole('*');
    const user = await this.usersService.create(command.user);
    const access = await this.accessService.grantingAccess({
      user,
      object,
      role,
    });
    console.log(access);
  }
}
