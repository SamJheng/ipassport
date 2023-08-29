import { ObjectAccess } from '../../models/ObjectAccess.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Role } from './Role.entity';
import { User } from './User.entity';

@Entity()
export class Access {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Role)
  @JoinColumn()
  role: Role;

  @ManyToOne(() => ObjectAccess)
  @JoinColumn()
  object: ObjectAccess;
  @ManyToOne(() => User, (user) => user.access, {
    onDelete: 'CASCADE',
  })
  user: User;
}
