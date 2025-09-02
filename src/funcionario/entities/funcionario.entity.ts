import { User } from 'src/users/entities/user.entity';
import { Column } from 'typeorm';

export class Funcionario extends User {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salary: number;
  @Column()
  position: string;
  @Column({ unique: true })
  employeeId: number;
}
