import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

import { Profile } from './Profile.entity';
import { SocialExternalProviders } from './SocialExternalProviders.entity';
import { getSaltHashByPassWord } from '../../lib/utils/salt-hash-generate';
// import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({
    unique: true,
  })
  email: string;
  @Column()
  username: string;
  @Column({
    nullable: true,
    default: null,
  })
  // @Exclude()
  password?: string;
  @Column({ default: false })
  isActive: boolean;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created?: Date;
  @OneToOne(() => Profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => SocialExternalProviders, (providers) => providers.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  provider: SocialExternalProviders[];
  /**
   * @note hashing user password
   * @memberof User
   */
  @BeforeInsert()
  public async hashPassWord() {
    if (!this.password) {
      this.password = null;
    } else {
      const hash = await getSaltHashByPassWord(this.password);
      this.password = hash;
    }
  }
  @BeforeInsert()
  public createdTime() {
    this.created = new Date();
  }
}
