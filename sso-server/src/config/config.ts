// import { TypeOrmDataSource } from './typeorm.config';

export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  // DATABASE_CONNECTION: TypeOrmDataSource[process.env.NAME],
});
