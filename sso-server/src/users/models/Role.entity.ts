import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true,
  })
  name: string;
}
