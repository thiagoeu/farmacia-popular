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

@Controller('funcionario')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post()
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionarioService.create(createFuncionarioDto);
  }

  @Get()
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Funcionario>> {
    return this.funcionarioService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.funcionarioService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFuncionarioDto: UpdateFuncionarioDto,
  ) {
    return this.funcionarioService.update(+id, updateFuncionarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.funcionarioService.remove(+id);
  }
}
