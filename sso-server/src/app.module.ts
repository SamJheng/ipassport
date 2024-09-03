import { AuthorizationModule } from './auth/authorzation.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import LogsMiddleware from './log/services/logs.middleware';
import { LoggerModule } from './log/logger.module';
import { join } from 'path';
import { PatientModule } from './patient/patient.module';
@Module({
  imports: [
    // AuthorizationModule.register({
    //   modelPath: join(__dirname, './config/casbin/model.conf'),
    //   policyAdapter: join(__dirname, './config/casbin/policy.csv'),
    //   global: true,
    // }),
    AuthModule,
    UsersModule,
    ConfigModule,
    LoggerModule,
    PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
