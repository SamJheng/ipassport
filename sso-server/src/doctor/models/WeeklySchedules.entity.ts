import { DayOfWeek } from '../../models/day-of-week.enum';
import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { DoctorInfo } from './DoctorInfo.entity';

@Entity()
@Unique(['doctor', 'DayOfWeek', 'StartTime']) // 確保同一醫生在同一天和時間段內只有一個排班
export class WeeklySchedules {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DoctorInfo, (doctor) => doctor.weeklySchedules, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  doctor: DoctorInfo;

  @Column({
    type: 'enum',
    enum: DayOfWeek,
  })
  DayOfWeek: DayOfWeek;

  @Column({ type: 'time' })
  StartTime: string;

  @Column({ type: 'time' })
  EndTime: string;
}
