import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { Paginate } from 'nestjs-paginate';
import type { PaginateQuery, Paginated } from 'nestjs-paginate';
import { Funcionario } from './entities/funcionario.entity';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('funcionario')
@Controller('funcionario')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo funcionário' })
  @ApiBody({ type: CreateFuncionarioDto })
  @ApiResponse({ status: 201, description: 'Funcionário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionarioService.create(createFuncionarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os funcionários com paginação' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Lista de funcionários retornada.' })
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Funcionario>> {
    return this.funcionarioService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um funcionário pelo ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do funcionário' })
  @ApiResponse({ status: 200, description: 'Funcionário encontrado.' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.funcionarioService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados de um funcionário' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateFuncionarioDto })
  @ApiResponse({
    status: 200,
    description: 'Funcionário atualizado com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado.' })
  update(
    @Param('id') id: string,
    @Body() updateFuncionarioDto: UpdateFuncionarioDto,
  ) {
    return this.funcionarioService.update(+id, updateFuncionarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um funcionário' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Funcionário removido com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado.' })
  remove(@Param('id') id: string) {
    return this.funcionarioService.remove(+id);
  }
}
