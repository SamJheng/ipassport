import entities from 'src/lib/entities';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import DatabaseLogger from 'src/log/databaseLogger';

config();
const configService = new ConfigService();
console.log(configService.get('DB_HOST'));
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: entities,
  synchronize: true,
  logger: new DatabaseLogger(),
  // logging: false,
  migrationsRun: false,
  migrations: ['dist/**/migrations/*.js'],
  migrationsTableName: 'history',
});
