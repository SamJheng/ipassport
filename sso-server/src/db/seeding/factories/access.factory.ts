import { Access } from './../../../users/models/Access.entity';
import { define, factory } from 'typeorm-seeding';
define(Access, () => {
  const a = new Access();
  return a;
});
