import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/produto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProdutoDto): Promise<Product> {
    //Busca por um produto existente com o mesmo nome e lote
    const existingProduct = await this.productRepository.findOne({
      where: {
        name: createProductDto.name,
        batch: createProductDto.batch,
      },
    });

    if (existingProduct) {
      existingProduct.stock += createProductDto.stock;
      return this.productRepository.save(existingProduct);
    }

    const newProduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
  }

  findAll() {
    return `This action returns all produto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produto`;
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
