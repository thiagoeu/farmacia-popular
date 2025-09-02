import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {
  IsString,
  IsNumber,
  IsPositive,
  MinLength,
  isNumber,
} from 'class-validator';

export class CreateFuncionarioDto extends CreateUserDto {
  @IsNumber()
  @IsPositive()
  salary: number;

  @IsString()
  @MinLength(2)
  position: string;
}
