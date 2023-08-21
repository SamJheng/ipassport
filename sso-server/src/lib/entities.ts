import { Role } from '../users/models/Role.entity';
import { ObjectAccess } from '../models/ObjectAccess.entity';
import { Access } from '../users/models/Access.entity';
import { Profile } from '../users/models/Profile.entity';
import { SocialExternalProviders } from '../users/models/SocialExternalProviders.entity';
import { User } from '../users/models/User.entity';
import Log from '../log/models/log.entity';

const entities = [
  User,
  SocialExternalProviders,
  Profile,
  Log,
  Access,
  ObjectAccess,
  Role,
];

export { User };
export default entities;
