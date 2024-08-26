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
import { UpdateObjectCommand } from '../../commands/update-object';
import { HasAccess } from '../../../auth/access.guard';
@Controller('access')
export class AccessController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Get('object')
  @HasAccess({
    role: 'reader',
    object: 'access',
  })
  async getObjects() {
    const objects = await this.queryBus.execute(new GetObjectsCommand());
    const res = new ResponseResult({
      message: 'Get all objects',
      result: objects,
    });
    return res;
  }
  @Post('object')
  @HasAccess({
    role: 'editor',
    object: 'access',
  })
  async createObjectAccessByName(@Body('name') name: string) {
    await this.commandBus.execute(new AddObjectCommand(name));
    const res = new ResponseResult({
      message: 'Create object access by name',
    });
    return res;
  }
  @Put('object/:id')
  @HasAccess({
    role: 'editor',
    object: 'access',
  })
  async updateObjectAccessById(
    @Param('id') id: string,
    @Body('name') name: string,
  ) {
    await this.commandBus.execute(new UpdateObjectCommand(id, name));
    const res = new ResponseResult({
      message: 'Update object access by id',
    });
    return res;
  }
  @Delete('object/:id')
  @HasAccess({
    role: 'editor',
    object: 'access',
  })
  async deleteObjectAccessById(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteObjectCommand(id));
    const res = new ResponseResult({
      message: 'Delete object access by id',
    });
    return res;
  }
  @Post('role')
  @HasAccess({
    role: 'editor',
    object: 'access',
  })
  async createRoleByName(@Body('name') name: string) {
    await this.commandBus.execute(new AddRolerCommand(name));
    const res = new ResponseResult({
      message: 'Create role by name',
    });
    return res;
  }
}
