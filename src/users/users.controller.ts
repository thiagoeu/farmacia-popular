import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Paginate } from 'nestjs-paginate';
import type { PaginateQuery, Paginated } from 'nestjs-paginate';
import { ListAllUsersDto } from './dto/list-all-users.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('users') // Agrupa no Swagger
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const { password, refreshToken, ...result } = user;
    return result;
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários com paginação' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada.' })
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<ListAllUsersDto>> {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um usuário pelo ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um usuário existente' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um usuário' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
