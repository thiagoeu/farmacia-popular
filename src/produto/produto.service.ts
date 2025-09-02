import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/produto.entity';
import { Repository } from 'typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

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

    const newProduct = await this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Product>> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .select([
        'product.id',
        'product.name',
        'product.batch',
        'product.stock',
        'product.price',
        'product.createdAt',
        'product.updatedAt',
      ]);

    const paginatedProducts = await paginate<Product>(query, queryBuilder, {
      sortableColumns: ['name', 'batch', 'price', 'stock', 'createdAt'],
      searchableColumns: ['name', 'batch', 'price', 'stock'],
      defaultSortBy: [['name', 'ASC']],
      defaultLimit: 5,
      maxLimit: 10,
    });

    return paginatedProducts;
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new ConflictException('Produto não encontrado');
    }
    return product;
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new ConflictException('Usuário não encontrado');
    }

    // Salvar campos que serão alterados
    const changes: Partial<UpdateProdutoDto> = {};

    // Copiar outros campos
    Object.keys(updateProdutoDto).forEach((key) => {
      if (updateProdutoDto[key] !== undefined && key !== 'password') {
        changes[key] = updateProdutoDto[key];
      }
    });

    changes['updatedAt'] = new Date();
    const result = await this.productRepository.update(id, changes);

    return result.affected
      ? {
          message: 'Produto atualizado com sucesso',
          updatedFields: changes,
        }
      : null;
  }

  async remove(id: number) {
    const product = this.productRepository.findOneBy({ id });
    if (!product) {
      throw new ConflictException('Produto não encontrado');
    }
    const result = await this.productRepository.delete(id);

    return {
      message: 'Produto removido com sucesso',
      deletedProduct: result,
    };
  }
}
