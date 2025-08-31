import { Role } from '../../shared/enums/role.enum';

export class ListAllUsersDto {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  role: Role;
}
