import { Access } from './../../../users/models/Access.entity';
import { Profile } from '../../../users/models/Profile.entity';
import { User } from '../../../users/models/User.entity';
import { define, factory } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';

define(Profile, () => {
  const profile = new Profile();
  profile.gender = faker.person.gender();
  profile.photo = '';
  // profile.user = factory(User)() as any;
  return profile;
});

define(User, () => {
  const username = faker.internet.userName();
  // const password = faker.internet.password();
  const password = 'password';
  console.log(password);
  const user = new User();
  user.username = username;
  user.password = password;
  user.email = faker.internet.email();
  user.firstName = faker.person.firstName();
  user.lastName = 'BOT';
  // user.lastName = faker.person.lastName();
  user.isActive = false;
  // user.profile = factory(Profile)() as any;

  return user;
});
