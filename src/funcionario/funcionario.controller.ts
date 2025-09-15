import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { Paginate } from 'nestjs-paginate';
import type { PaginateQuery, Paginated } from 'nestjs-paginate';
import { Funcionario } from './entities/funcionario.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/shared/enums/role.enum';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { use } from 'passport';

@ApiTags('funcionario')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('funcionario')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo funcionário (somente ADMIN)' })
  @ApiBody({ type: CreateFuncionarioDto })
  @ApiResponse({ status: 201, description: 'Funcionário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionarioService.create(createFuncionarioDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Listar todos os funcionários com paginação (somente ADMIN)',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Lista de funcionários retornada.' })
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Funcionario>> {
    return this.funcionarioService.findAll(query);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Buscar um funcionário pelo ID (somente ADMIN)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do funcionário' })
  @ApiResponse({ status: 200, description: 'Funcionário encontrado.' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.funcionarioService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Atualizar dados de um funcionário (somente ADMIN)',
  })
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
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Remover um funcionário (somente ADMIN)' })
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
