import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WeeklySchedules } from './WeeklySchedules.entity';

@Entity()
export class DoctorInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  workPlace;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  specialty;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  title;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  education;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  experience;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  treatmentScope;
  @OneToMany(() => WeeklySchedules, (schedule) => schedule.doctor)
  WeeklySchedules: WeeklySchedules[];
}
