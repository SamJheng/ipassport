import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RoleType {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true,
  })
  name: string;
}
