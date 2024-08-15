import { AccessService } from './services/access.service';
import { Access } from './models/Access.entity';
import { ProfileService } from './services/profile.service';
import { Profile } from './models/Profile.entity';
import { UsersController } from './controllers/users.controller';
import { SocialExternalProviders } from './models/SocialExternalProviders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { User } from './models/User.entity';
import { AddRoleHandler } from './commands/handlers/add-role.handler';
import { Role } from './models/Role.entity';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      SocialExternalProviders,
      Profile,
      Access,
      Role,
    ]),
    CqrsModule,
  ],
  providers: [UsersService, ProfileService, AccessService, AddRoleHandler],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
