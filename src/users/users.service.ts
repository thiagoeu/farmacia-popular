import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ListAllUsersDto } from './dto/list-all-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (userExists) {
      throw new ConflictException('Usuario já cadastrado');
    }

    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<ListAllUsersDto>> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.role',
        'user.createdAt',
        'user.updatedAt',
      ]);

    const paginatedUsers = await paginate<User>(query, queryBuilder, {
      sortableColumns: ['name', 'email', 'role', 'createdAt'],
      searchableColumns: ['name', 'email'],
      defaultSortBy: [['name', 'ASC']],
      defaultLimit: 5,
      maxLimit: 10,
    });

    return paginatedUsers;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new ConflictException(
        'Usuário não encontrado - :id não encontrado',
      );
    }
    const { password, refreshToken, ...result } = user;
    return result;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new ConflictException(
        'Usuário não encontrado - :email não encontrado',
      );
    }

    return await this.userRepository.findOneBy({ email });
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new ConflictException('Usuário não encontrado');
    }

    // Salvar campos que serão alterados
    const changes: Partial<UpdateUserDto> = {};

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      changes.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    // Copiar outros campos
    Object.keys(updateUserDto).forEach((key) => {
      if (updateUserDto[key] !== undefined && key !== 'password') {
        changes[key] = updateUserDto[key];
      }
    });

    changes['updatedAt'] = new Date();
    const result = await this.userRepository.update(id, changes);

    return result.affected
      ? {
          message: 'Usuário atualizado com sucesso',
          updatedFields: changes,
        }
      : null;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new ConflictException('Usuário não encontrado');
    }
    const result = await this.userRepository.delete(id);
    return result.affected ? { message: 'Usuário removido com sucesso' } : null;
  }
}
