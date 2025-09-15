import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { Funcionario } from './entities/funcionario.entity';

import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/shared/enums/role.enum';

@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,
  ) {}
  async create(createFuncionarioDto: CreateFuncionarioDto) {
    const funcionarioExists = await this.funcionarioRepository.findOne({
      where: {
        email: createFuncionarioDto.email,
      },
    });

    if (funcionarioExists) {
      throw new ConflictException('Funcionario já cadastrado');
    }

    const salt = await bcrypt.genSalt();
    createFuncionarioDto.password = await bcrypt.hash(
      createFuncionarioDto.password,
      salt,
    );

    const funcionario = this.funcionarioRepository.create({
      ...createFuncionarioDto,
      role: Role.FUNCIONARIO,
    });

    return await this.funcionarioRepository.save(funcionario);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Funcionario>> {
    const queryBuilder = this.funcionarioRepository
      .createQueryBuilder('funcionarios')
      .select([
        'funcionarios.id',
        'funcionarios.name',
        'funcionarios.email',
        'funcionarios.role',
        'funcionarios.createdAt',
        'funcionarios.updatedAt',
      ]);

    const paginatedFuncionarios = await paginate<Funcionario>(
      query,
      queryBuilder,
      {
        sortableColumns: [
          'name',
          'salary',
          'position',
          'employeeId',
          'email',
          'role',
          'createdAt',
        ],
        searchableColumns: ['name', 'email', 'position', 'salary'],
        defaultSortBy: [['name', 'ASC']],
        defaultLimit: 5,
        maxLimit: 10,
      },
    );

    return paginatedFuncionarios;
  }

  async findOne(id: number) {
    const funcionario = await this.funcionarioRepository.findOneBy({ id });

    if (!funcionario) {
      throw new ConflictException(
        'Usuário não encontrado - :id não encontrado',
      );
    }
    const { password, refreshToken, ...result } = funcionario;
    return result;
  }

  async update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {
    const user = await this.funcionarioRepository.findOneBy({ id });
    if (!user) {
      throw new ConflictException('Usuário não encontrado');
    }

    // Salvar campos que serão alterados
    const changes: Partial<UpdateFuncionarioDto> = {};

    if (updateFuncionarioDto.password) {
      const salt = await bcrypt.genSalt();
      changes.password = await bcrypt.hash(updateFuncionarioDto.password, salt);
    }

    // Copiar outros campos
    Object.keys(updateFuncionarioDto).forEach((key) => {
      if (updateFuncionarioDto[key] !== undefined && key !== 'password') {
        changes[key] = updateFuncionarioDto[key];
      }
    });

    changes['updatedAt'] = new Date();
    const result = await this.funcionarioRepository.update(id, changes);

    return result.affected
      ? {
          message: 'Funcioanario atualizado com sucesso',
          updatedFields: changes,
        }
      : null;
  }

  async remove(id: number) {
    const funcionario = await this.funcionarioRepository.findOneBy({ id });
    if (!funcionario) {
      throw new ConflictException('Usuário não encontrado');
    }
    const result = await this.funcionarioRepository.delete(id);
    return result.affected
      ? { message: 'Funcionario removido com sucesso' }
      : null;
  }
}
