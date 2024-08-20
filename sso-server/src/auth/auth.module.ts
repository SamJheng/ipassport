import { AuthGuard } from './auth.guard';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { GoogleController } from './controllers/google/google.controller';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { SignInHandler } from './commands/signin';
import { VerifyGoogleHandler } from './commands/verify-google';
import { LoggerModule } from '../log/logger.module';
import { AccessGuard } from './access.guard';
@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secretOrPrivateKey: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
    CqrsModule,
    LoggerModule,
  ],
  controllers: [AuthController, GoogleController],
  providers: [
    AuthService,
    SignInHandler,
    VerifyGoogleHandler,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
