import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PatientInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  patientId: string;
  @Column({ type: 'int' })
  @Generated('increment')
  medicalRecordNumber;
  @Column({ nullable: true })
  allergies: string;
  @Column({ nullable: true })
  medicalHistory: string;
  @Column({ nullable: true })
  insuranceInformation: string;
  // @BeforeInsert()
  // async generateMedicalRecordNumber() {
  //   this.medicalRecordNumber = await this.getNextMedicalRecordNumber();
  // }

  // private async getNextMedicalRecordNumber(): Promise<number> {
  //   const maxNumber = await this.getMaxMedicalRecordNumberFromDB();
  //   return maxNumber + 1;
  // }

  // private async getMaxMedicalRecordNumberFromDB(): Promise<number> {
  //   return 1;
  // }
}
