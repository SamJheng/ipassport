import { Profile } from './../users/models/Profile.entity';
import { SocialExternalProviders } from './../users/models/SocialExternalProviders.entity';
import { User } from 'src/users/models/User.entity';

const entities = [User, SocialExternalProviders, Profile];

export { User };
export default entities;
