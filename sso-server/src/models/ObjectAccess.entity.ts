import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ObjectAccess {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true,
  })
  name: string;
}
