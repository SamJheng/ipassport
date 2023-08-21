import { Access } from './../../../users/models/Access.entity';
import { define, factory } from 'typeorm-seeding';
import { Role } from '../../../users/models/Role.entity';
import { ObjectAccess } from '../../../models/ObjectAccess.entity';
define(Access, () => {
  const a = new Access();
  return a;
});

define(ObjectAccess, () => {
  const o = new ObjectAccess();
  return o;
});

define(Role, () => {
  const r = new Role();
  return r;
});
