import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';

import { Profile } from './Profile.entity';
import { SocialExternalProviders } from './SocialExternalProviders.entity';
import { getSaltHashByPassWord } from '../../lib/utils/salt-hash-generate';
import { Access } from './Access.entity';
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
  @CreateDateColumn()
  created?: Date;
  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => SocialExternalProviders, (providers) => providers.user)
  @JoinColumn()
  provider: SocialExternalProviders[];
  @OneToMany(() => Access, (access) => access.user)
  @JoinColumn()
  access: Access[];
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
