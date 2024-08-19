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
import { AddObjectCommand } from '../../commands/add-object';
import { AddRolerCommand } from '../../commands/add-role';
import { DeleteObjectCommand } from '../../commands/delete-object';
import { GetObjectsCommand } from '../../commands/get-objects';

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
  async getAllUsers(): Promise<ResponseResult> {
    const all = await this.usersService.findAll();
    const res = new ResponseResult({
      meassge: 'Get all user',
      result: all,
    });
    return res;
  }
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<ResponseResult> {
    const user = await this.usersService.findOne(id);
    const res = new ResponseResult({
      meassge: 'Get a user by user id',
      result: user,
    });
    return res;
  }

  // @Post()
  // async createUser(userDto: CreateUserDto): Promise<ResponseResult> {
  //   const create = await this.usersService.create(userDto);
  //   const res = new ResponseResult({
  //     meassge: 'Post data for create user',
  //     result: create,
  //   });
  //   return res;
  // }
  @Put(':id')
  async editUser(
    @Param('id') id: string,
    @Body() editDto: EditUserDto,
  ): Promise<ResponseResult> {
    const update = await this.usersService.update(id, editDto);
    const res = new ResponseResult({
      meassge: 'Put id and update user',
      result: update,
    });
    return res;
  }
  @Put('profile/:id')
  async editProfile(
    @Param('id') id: string,
    @Body() editDto: EditUserProfileDto,
  ): Promise<ResponseResult> {
    const update = await this.profileService.update(id, editDto);
    const res = new ResponseResult({
      meassge: 'Put id and update profile of user',
      result: update,
    });
    return res;
  }
}
