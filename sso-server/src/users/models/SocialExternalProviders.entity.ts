import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';
export enum ExternalType {
  Google,
}
@Entity()
export class SocialExternalProviders {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => User, (user) => user.provider)
  user: User;
  // @ApiProperty({
  //   enum: ExternalType,
  //   description: '0 is Google',
  // })
  @Column({
    type: 'enum',
    enum: ExternalType,
  })
  externalType: ExternalType;
  @Column()
  email: string;
  @Column()
  username: string;
  @Column({
    unique: true,
  })
  providerId: string;
  @Column()
  picture: string;
  @Column()
  emailVerified: boolean;
  @Column()
  locale: string;
}
