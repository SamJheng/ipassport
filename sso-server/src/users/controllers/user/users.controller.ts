import { Action } from '../../../models/action.enum';
import { AccessService } from '../../services/access.service';
import { ProfileService } from '../../services/profile.service';
import { EditUserProfileDto, GrantingAccess } from '../../models/User.dto';
import { ResponseResult } from '../../../models/respone';
import { CreateUserDto, EditUserDto } from '../../models/User.dto';
import { UsersService } from '../../services/users.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { HasAccess } from '../../../auth/access.guard';
import { UpdateUserCommand } from '../../commands/update-user';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private profileService: ProfileService,
    private accessService: AccessService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Get()
  @HasAccess({
    role: 'reader',
    object: 'user',
  })
  async getAllUsers(): Promise<ResponseResult> {
    const all = await this.usersService.findAll();
    const res = new ResponseResult({
      message: 'Get all user',
      result: all,
    });
    return res;
  }
  @Get(':id')
  @HasAccess({
    role: 'reader',
    object: 'user',
  })
  async getUserById(@Param('id') id: string): Promise<ResponseResult> {
    const user = await this.usersService.findOne(id);
    const res = new ResponseResult({
      message: 'Get a user by user id',
      result: user,
    });
    return res;
  }
  @Put(':id')
  @HasAccess({
    role: 'editor',
    object: 'user',
  })
  async editUser(
    @Param('id') id: string,
    @Body() editDto: EditUserDto,
  ): Promise<ResponseResult> {
    const user = await this.commandBus.execute(
      new UpdateUserCommand(id, editDto),
    );
    const res = new ResponseResult({
      message: 'update user is success',
    });
    return res;
  }
}
