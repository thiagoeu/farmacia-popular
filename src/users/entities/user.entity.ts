import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../shared/enums/role.enum';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USUARIO,
  })
  role: Role;

  @Column({ default: '' })
  @Exclude()
  refreshToken: string;
}
