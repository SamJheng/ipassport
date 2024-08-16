import { Action } from './../../models/action.enum';
import { AccessService } from '../services/access.service';
import { ProfileService } from '../services/profile.service';
import { EditUserProfileDto, GrantingAccess } from './../models/User.dto';
import { ResponseResult } from '../../models/respone';
import { CreateUserDto, EditUserDto } from '../models/User.dto';
import { UsersService } from '../services/users.service';
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
import { AddRoleHandler } from '../commands/handlers/add-role.handler';
import { AddRolerCommand } from '../commands/add-role.command';
import { AddObjectCommand } from '../commands/add-object.command';

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

  @Post()
  async createUser(userDto: CreateUserDto): Promise<ResponseResult> {
    const create = await this.usersService.create(userDto);
    const res = new ResponseResult({
      meassge: 'Post data for create user',
      result: create,
    });
    return res;
  }
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
  @Post('access/:id')
  async grantingAccessToUser(
    @Param('id') id: string,
    @Body() granting: GrantingAccess,
  ): Promise<ResponseResult> {
    const { role, object } = granting;

    const isExist = await this.accessService.findByRoleAndObject(
      role.id,
      object.id,
      id,
    );
    if (isExist) {
      const res = new ResponseResult({
        success: false,
        meassge: `This access of [${granting.role.name}:${granting.object.name}] is exist`,
        // result: isExist,
      });
      return res;
    }
    // const user = await this.usersService.findOne(id);
    const create = await this.accessService.create({
      role,
      object,
      user: {
        id,
      },
    });
    const res = new ResponseResult({
      meassge: 'Put id and granting access to user',
      result: create,
    });
    return res;
  }
  @Delete(':id')
  async removeUser(@Param('id') id: string): Promise<ResponseResult> {
    const remove = await this.usersService.remove(id);
    const res = new ResponseResult({
      meassge: 'Delete user by user id',
      result: remove,
    });
    return res;
  }
  @Post('role')
  async createRoleByName(@Body('name') name: string) {
    await this.commandBus.execute(new AddRolerCommand(name));
    const res = new ResponseResult({
      meassge: 'Create role by name',
    });
    return res;
  }
  @Post('object')
  async createObjectAccessByName(@Body('name') name: string) {
    await this.commandBus.execute(new AddObjectCommand(name));
    const res = new ResponseResult({
      meassge: 'Create object access by name',
    });
    return res;
  }
}
