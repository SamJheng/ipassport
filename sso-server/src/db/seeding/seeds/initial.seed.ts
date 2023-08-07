// @/src/db/seeding/seeds/initialSeed.ts
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import Log from '../../../log/models/log.entity';

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const log = await factory(Log)().createMany(5);

    // ...
  }
}
