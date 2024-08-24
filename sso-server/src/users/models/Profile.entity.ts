import { User } from './User.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  gender: string;

  @Column()
  photo: string;
  @Column({ nullable: true })
  birthday: string;
}
