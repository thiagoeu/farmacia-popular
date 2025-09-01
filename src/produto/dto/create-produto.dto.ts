import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateProdutoDto {
  @IsString({ message: 'The name must be a string' })
  @IsNotEmpty({ message: 'Product name is required' })
  name: string;

  @IsString({ message: 'The batch must be a string' })
  @IsNotEmpty({ message: 'Batch is required' })
  batch: string;

  @IsNumber({}, { message: 'The price must be numeric' })
  @Min(0, { message: 'The price cannot be negative' })
  price: number;

  @IsNumber({}, { message: 'The stock must be numeric' })
  @Min(0, { message: 'The stock cannot be negative' })
  stock: number;

  @IsOptional()
  @IsString({ message: 'The description must be a string' })
  description?: string;
}
