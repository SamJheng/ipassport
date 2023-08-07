import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import entities from '../lib/entities';

config();
const configService = new ConfigService();
const typeOrmConfig = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: entities,
  seeds: ['src/db/seeding/seeds/**/*{.ts,.js}'],
  factories: ['src/db/seeding/factories/**/*{.ts,.js}'],
};
export default typeOrmConfig;
