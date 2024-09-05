import { AccessService } from './services/access.service';
import { Access } from './models/Access.entity';
import { ProfileService } from './services/profile.service';
import { Profile } from './models/Profile.entity';
import { UsersController } from './controllers/user/users.controller';
import { SocialExternalProviders } from './models/SocialExternalProviders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { User } from './models/User.entity';
import { AddRoleHandler } from './commands/add-role';
import { Role } from './models/Role.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { ObjectAccess } from '../models/ObjectAccess.entity';
import { AddObjectHandler } from './commands/add-object';
import { GetObjectsHandler } from './commands/get-objects';
import { DeleteObjectHandler } from './commands/delete-object';
import { AccessController } from './controllers/access/access.controller';
import { UpdateUserHandler } from './commands/update-user';
import { GetAccessHandler } from './commands/get-access';
import { GetRoleHandler } from './commands/get-role';
import { DeleteAccessHandler } from './commands/delete-access';
import { AddAccessHandler } from './commands/add-access';
import { UpdateAccessHandler } from './commands/update-access';
import { RoleType } from './models/RoleType.entity';
import { AddRoleTypeHandler } from './commands/add-role-type';
const handlers = [
  AddRoleHandler,
  AddObjectHandler,
  DeleteObjectHandler,
  GetObjectsHandler,
  UpdateUserHandler,
  GetAccessHandler,
  GetRoleHandler,
  DeleteAccessHandler,
  AddAccessHandler,
  UpdateAccessHandler,
  AddRoleTypeHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      SocialExternalProviders,
      Profile,
      Access,
      Role,
      RoleType,
      ObjectAccess,
    ]),
    CqrsModule,
  ],
  providers: [UsersService, ProfileService, AccessService, ...handlers],
  controllers: [UsersController, AccessController],
  exports: [UsersService, AccessService],
})
export class UsersModule {}
