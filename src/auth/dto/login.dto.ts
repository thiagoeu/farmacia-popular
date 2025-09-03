import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'thiago@email.com',
    description: 'E-mail do usuário para login',
  })
  @IsString({ message: 'O email deve ser uma string obrigatória' })
  @IsEmail({}, { message: 'Formato de e-mail inválido' })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário (mínimo 6 caracteres)',
    minLength: 6,
  })
  @IsString({ message: 'A senha deve ser uma string' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;
}
