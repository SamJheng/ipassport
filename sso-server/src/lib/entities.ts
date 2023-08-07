import { Profile } from '../users/models/Profile.entity';
import { SocialExternalProviders } from '../users/models/SocialExternalProviders.entity';
import { User } from '../users/models/User.entity';
import Log from '../log/models/log.entity';
const entities = [User, SocialExternalProviders, Profile, Log];

export { User };
export default entities;
