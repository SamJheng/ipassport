import { User } from '../../users/models/User.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Appointments {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'date',
  })
  date: Date;
  @Column({
    type: 'time',
  })
  time: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  status: string;
  @Column({
    type: 'text',
    nullable: true,
  })
  notes: string;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @ManyToOne(() => User, (providers) => providers.doctorAppointments)
  @JoinColumn({ name: 'patientId' })
  @Index()
  doctor: User;
  @ManyToOne(() => User, (providers) => providers.patientAppointments)
  @JoinColumn({ name: 'doctorId' })
  @Index()
  patient: User;
}
