import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  gender: string;

  @Column()
  photo: string;
}
