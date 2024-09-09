import { RoleType } from './RoleType.entity';
import { User } from './User.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  photo: string;
  @Column({ type: 'int', unique: true, nullable: true })
  age: number;
  @Column({ nullable: true })
  birthday: string;
  @Column({ nullable: true })
  contact: string;
  @Column({ nullable: true })
  address: string;
  @ManyToOne(() => RoleType, {
    cascade: true,
  })
  @JoinColumn()
  roleType: RoleType;
}
