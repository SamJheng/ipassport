import { ObjectAccess } from 'src/models/ObjectAccess.entity';
import { Role } from './Role.entity';
import { User } from './User.entity';

export class GrantingAccess {
  role: Partial<Role>;
  object: Partial<ObjectAccess>;
  user?: Partial<User>;
}
export class UpdateAccess {
  id: string;
  role: Partial<Role>;
  object: Partial<ObjectAccess>;
}
