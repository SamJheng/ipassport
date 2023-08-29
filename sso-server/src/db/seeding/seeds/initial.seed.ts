import { Entity, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import Log from '../../../log/models/log.entity';
import { Profile } from '../../../users/models/Profile.entity';
import { ObjectAccess } from '../../../models/ObjectAccess.entity';
import { Role } from '../../../users/models/Role.entity';
import { Access } from '../../../users/models/Access.entity';
import { User } from '../../../users/models/User.entity';
import { faker } from '@faker-js/faker';

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    // await factory(User)().createMany(1);
    const admin = this.generateRole('admin');
    const editor = this.generateRole('editor');
    const reader = this.generateRole('reader');
    const guest = this.generateRole('guest');
    const userObj = this.generateObjectAccess('user');
    const god = this.generateRole('*');
    const allObj = this.generateObjectAccess('*');
    const user = this.geanrateFakerUser();
    
    const existed_god = await this.existingInTable(connection, Role, {
      name: god.name,
    });
    const existed_admin = await this.existingInTable(connection, Role, {
      name: admin.name,
    });
    const existed_editor = await this.existingInTable(connection, Role, {
      name: editor.name,
    });
    const existed_reader = await this.existingInTable(connection, Role, {
      name: reader.name,
    });
    const existed_guest = await this.existingInTable(connection, Role, {
      name: guest.name,
    });
    const existed_userObj = await this.existingInTable(
      connection,
      ObjectAccess,
      {
        name: userObj.name,
      },
    );

    const existed_allObj = await this.existingInTable(
      connection,
      ObjectAccess,
      {
        name: allObj.name,
      },
    );
    if (!existed_god) {
      await factory(Role)().create(god);
    }
    if (!existed_admin) {
      await factory(Role)().create(admin);
    }
    if (!existed_editor) {
      await factory(Role)().create(editor);
    }
    if (!existed_reader) {
      await factory(Role)().create(reader);
    }
    if (!existed_guest) {
      await factory(Role)().create(guest);
    }
    if (!existed_userObj) {
      await factory(ObjectAccess)().create(userObj);
    }
    if (!existed_allObj) {
      await factory(ObjectAccess)().create(allObj);
    }
    const existed_user = await factory(User)().create(user);
    const profile = this.geanrateFakerUserProfile(existed_user);
    const existed_profile = await factory(Profile)().create(profile);
    const access = this.geanrateAccess(
      existed_userObj as ObjectAccess,
      existed_guest as Role,
      existed_user,
    );
    await factory(Access)().create(access);
  }
  generateRole(name): Role {
    const r = new Role();
    r.name = name;
    return r;
  }
  generateObjectAccess(name): ObjectAccess {
    const o = new ObjectAccess();
    o.name = name;
    return o;
  }
  async existingInTable(
    connection: Connection,
    repository: EntityTarget<ObjectLiteral>,
    checkCondition: any,
  ) {
    const existed = await connection
      .getRepository(repository)
      .findOne({ where: checkCondition });
    return existed;
  }
  geanrateFakerUser(password = 'password', lastName = 'BOT'): User {
    const username = faker.internet.userName();
    const profile = new Profile();
    profile.gender = faker.person.gender();
    profile.photo = '';
    const user = new User();
    user.username = username;
    user.password = password;
    user.email = faker.internet.email();
    user.firstName = faker.person.firstName();
    user.lastName = lastName;
    user.isActive = false;
    user.profile = profile;
    return user;
  }
  geanrateFakerUserProfile(user: User): Profile {
    const profile = new Profile();
    profile.user = user;
    profile.gender = faker.person.gender();
    profile.photo = '';
    return profile;
  }
  geanrateAccess(userObj: ObjectAccess, role: Role, user: User): Access {
    const access = new Access();
    access.object = userObj;
    access.role = role;
    access.user = user;
    return access;
  }
}
