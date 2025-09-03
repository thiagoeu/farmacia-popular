import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProdutoDto {
  @ApiProperty({
    example: 'Notebook Gamer',
    description: 'Product name',
  })
  @IsString({ message: 'The name must be a string' })
  @IsNotEmpty({ message: 'Product name is required' })
  name: string;

  @ApiProperty({
    example: 'LoteA123',
    description: 'Batch identification code',
  })
  @IsString({ message: 'The batch must be a string' })
  @IsNotEmpty({ message: 'Batch is required' })
  batch: string;

  @ApiProperty({
    example: 3500.5,
    description: 'Product price',
    minimum: 0,
  })
  @IsNumber({}, { message: 'The price must be numeric' })
  @Min(0, { message: 'The price cannot be negative' })
  price: number;

  @ApiProperty({
    example: 10,
    description: 'Available stock quantity',
    minimum: 0,
  })
  @IsNumber({}, { message: 'The stock must be numeric' })
  @Min(0, { message: 'The stock cannot be negative' })
  stock: number;

  @ApiPropertyOptional({
    example: 'High performance gaming notebook',
    description: 'Optional product description',
  })
  @IsOptional()
  @IsString({ message: 'The description must be a string' })
  description?: string;
}
