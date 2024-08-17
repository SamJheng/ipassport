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
import { ResponseResult } from '../../../models/respone';
import { AddObjectCommand } from '../../commands/add-object';
import { AddRolerCommand } from '../../commands/add-role';
import { DeleteObjectCommand } from '../../commands/delete-object';
import { GetObjectsCommand } from '../../commands/get-objects';

@Controller('access')
export class AccessController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Get('object')
  async getObjects() {
    const objects = await this.queryBus.execute(new GetObjectsCommand());
    const res = new ResponseResult({
      meassge: 'Get all objects',
      result: objects,
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
  @Delete('object/:id')
  async deleteObjectAccessById(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteObjectCommand(id));
    const res = new ResponseResult({
      meassge: 'Delete object access by id',
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
}
