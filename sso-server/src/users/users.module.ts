import { SocialExternalProviders } from './models/SocialExternalProviders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { User } from './models/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, SocialExternalProviders])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
