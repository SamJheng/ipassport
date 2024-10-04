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
import { PatientInfo } from '../../patient/models/PatientInfo.entity';
import { DoctorInfo } from '../../doctor/models/DoctorInfo.entity';
import { Appointments } from '../../appointments/models/Appointmets.entity';

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
  @Column({ type: 'boolean', default: false })
  isActive: boolean;
  @Column({ type: 'boolean', default: false })
  isDelete: boolean;
  @CreateDateColumn()
  created?: Date;
  @OneToOne(() => Profile, {
    cascade: true,
  })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => SocialExternalProviders, (providers) => providers.user)
  provider: SocialExternalProviders[];
  @OneToMany(() => Access, (access) => access.user)
  access: Access[];
  @OneToOne(() => PatientInfo, {
    cascade: true,
  })
  @JoinColumn()
  patientInfo: PatientInfo;
  @OneToOne(() => DoctorInfo, {
    cascade: true,
  })
  @JoinColumn()
  doctorInfo: DoctorInfo;

  @OneToMany(() => Appointments, (appointment) => appointment.doctor)
  doctorAppointments: Appointments[];
  @OneToMany(() => Appointments, (appointment) => appointment.patient)
  patientAppointments: Appointments[];

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
