import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import Log from '../../../log/models/log.entity';

define(Log, () => {
  const log = new Log();
  log.context = 'faker';
  log.level = 'debug';
  log.message = faker.lorem.words(8);
  return log;
});
