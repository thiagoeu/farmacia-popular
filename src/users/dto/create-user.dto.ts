import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Thiago Araujo',
    description: 'Nome completo do usuário',
  })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @ApiProperty({
    example: 'thiago@email.com',
    description: 'Endereço de e-mail válido',
  })
  @IsEmail({}, { message: 'E-mail inválido' })
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
