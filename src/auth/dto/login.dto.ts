import { IsString, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'O email deve ser uma string obrigatória' })
  @IsEmail()
  email: string;

  @IsString({ message: 'A senha deve ter no minimo 6 caracteres' })
  @MinLength(6)
  password: string;
}
