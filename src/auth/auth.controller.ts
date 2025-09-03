import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user';
import { Roles } from './decorators/roles.decorators';
import { RolesGuard } from './guards/roles.guard';
import { Role } from 'src/shared/enums/role.enum';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'Login de usuário e obtenção de access/refresh tokens',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login bem-sucedido. Retorna access e refresh token.',
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/refresh')
  @ApiOperation({
    summary: 'Gerar um novo access token a partir do refresh token',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: { type: 'string', example: 'eyJhbGciOi...' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Novo token gerado.' })
  @ApiResponse({ status: 401, description: 'Refresh token inválido/expirado.' })
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter perfil do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil retornado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Token inválido ou ausente.' })
  getProfile(@CurrentUser() user: any) {
    return user;
  }

  @Post('/create-admin')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar um novo administrador (somente ADMIN)' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Administrador criado com sucesso.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado. Requer role ADMIN.',
  })
  createAdmin(@Body() createUserDto: CreateUserDto) {
    return this.authService.createAdmin(createUserDto);
  }
}
