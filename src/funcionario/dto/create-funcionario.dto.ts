import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IsString, IsNumber, IsPositive, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFuncionarioDto extends CreateUserDto {
  @ApiProperty({
    description: 'Salary of the employee',
    example: 3500,
  })
  @IsNumber()
  @IsPositive({ message: 'Salary must be a positive number' })
  salary: number;

  @ApiProperty({
    description: 'Position of the employee',
    example: 'Manager',
    minLength: 2,
  })
  @IsString()
  @MinLength(2, { message: 'Position must be at least 2 characters' })
  position: string;

  @ApiProperty({
    description: 'Employee identification number',
    example: 'EMP001',
    minLength: 4,
  })
  @IsString()
  @MinLength(4, { message: 'Employee id must be at least 4 characters' })
  employeeId: string;
}
