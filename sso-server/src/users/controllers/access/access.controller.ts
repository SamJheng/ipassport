import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseResult } from '../../../models/respone';
import { AddObjectCommand } from '../../commands/add-object';
import { AddRolerCommand } from '../../commands/add-role';
import { DeleteObjectCommand } from '../../commands/delete-object';
import { GetObjectsCommand } from '../../commands/get-objects';
import { UpdateObjectCommand } from '../../commands/update-object';
import { HasAccess } from '../../../auth/access.guard';
import { GetAccessCommand } from '../../commands/get-access';
import { GetRoleCommand } from '../../commands/get-role';
import { DeleteAccessCommand } from '../../commands/delete-access';
import { AddAccessCommand } from '../../commands/add-access';
import { UpdateAccessCommand } from '../../commands/update-access';
import { AddRoleTypeCommand } from '../../commands/add-role-type';
import { GetAllRoleTypeCommand } from '../../commands/get-all-role-type';
import { RoleType } from '../../models/RoleType.entity';
import { UpdateUserRoleTypeCommand } from '../../commands/update-user-role-type';
@Controller('access')
export class AccessController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @HasAccess({
    role: 'reader',
    object: 'access',
  })
  @Get('user/:id')
  async getAccessByUserId(@Param('id') id: string) {
    const accessList = await this.queryBus.execute(new GetAccessCommand(id));
    const res = new ResponseResult({
      message: 'Get user all access',
      result: accessList,
    });
    return res;
  }
  @Post('user/:id')
  @HasAccess({
    role: 'editor',
    object: 'access',
  })
  @HttpCode(HttpStatus.CREATED)
  async createAccess(
    @Param('id') userId: string,
    @Body('objectId') objectId: string,
    @Body('roleId') roleId: string,
  ) {
    await this.commandBus.execute(
      new AddAccessCommand(userId, objectId, roleId),
    );
    const res = new ResponseResult({
      message: 'Create access by id',
    });
    return res;
  }
  @Put('user/:id')
  @HasAccess({
    role: 'editor',
    object: 'access',
  })
  async updateAccessById(
    @Body('id') id: string,
    @Body('objectId') objectId: string,
    @Body('roleId') roleId: string,
  ) {
    const result = await this.commandBus.execute(
      new UpdateAccessCommand(id, objectId, roleId),
    );
    const res = new ResponseResult({
      message: 'Update access by id',
      result,
    });
    return res;
  }
  @Delete('user/:id')
  @HasAccess({
    role: 'editor',
    object: 'access',
  })
  async deleteAccessByid(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteAccessCommand(id));
    const res = new ResponseResult({
      message: 'Delete access by id',
    });
    return res;
  }
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
      message: 'Create access object by name',
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
  @Get('role')
  @HasAccess({
    role: 'reader',
    object: 'access',
  })
  async getAllRole() {
    const roles = await this.queryBus.execute(new GetRoleCommand());
    const res = new ResponseResult({
      message: 'Get all role',
      result: roles,
    });
    return res;
  }
  @Post('role')
  @HttpCode(HttpStatus.CREATED)
  @HasAccess({
    role: 'editor',
    object: 'access',
  })
  async createRoleByName(@Body('name') name: string) {
    await this.commandBus.execute(new AddRolerCommand(name));
    const res = new ResponseResult({
      message: 'Create a role by name',
    });
    return res;
  }
  @Get('position')
  @HasAccess({
    role: 'reader',
    object: 'access',
  })
  async getAllRoleType() {
    const roles = this.queryBus.execute(new GetAllRoleTypeCommand());
    const res = new ResponseResult({
      message: 'get all role type.',
      result: roles,
    });
    return res;
  }
  @Post('position')
  @HttpCode(HttpStatus.CREATED)
  @HasAccess({
    role: 'editor',
    object: 'access',
  })
  async createRoleTypeByName(@Body('name') name: string) {
    await this.commandBus.execute(new AddRoleTypeCommand(name));
    const res = new ResponseResult({
      message: 'Create a role type of position by name',
    });
    return res;
  }
  @Put('position/:id')
  @HasAccess({
    role: 'editor',
    object: 'access',
  })
  async updateUserRoleType(
    @Param('id') userId: string,
    @Body() roleType: RoleType,
  ) {
    await this.commandBus.execute(
      new UpdateUserRoleTypeCommand(userId, roleType),
    );
    const res = new ResponseResult({
      message: 'Update a role type of position by user.',
    });
    return res;
  }
}
