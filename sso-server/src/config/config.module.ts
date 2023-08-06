import { Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';
import config from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/lib/entities';
import { AppDataSource } from './typeorm.config';
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // console.log(AppDataSource.options);
        return AppDataSource.options;
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [NestConfigModule, TypeOrmModule],
})
export class ConfigModule {}
