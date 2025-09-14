import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/shared/enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorators';

@Injectable()
// Guard para proteger rotas com base em permissões de papéis (roles)
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  // Método principal que define se a requisição pode continuar
  canActivate(context: ExecutionContext): boolean {
    // Busca os roles necessários a partir dos metadados (definidos com o decorator @Roles)
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(), // Primeiro verifica se o metadata está no método
      context.getClass(), // Depois verifica na classe (controller)
    ]);

    // Se não houver roles definidas, a rota é pública ou sem restrição por role
    if (!requiredRoles) {
      return true;
    }

    // Recupera o usuário da requisição (setado pelo JwtStrategy no req.user)
    const { user } = context.switchToHttp().getRequest();

    // Se não houver usuário na requisição, o acesso é negado
    if (!user) {
      throw new ForbiddenException('Usuário não autenticado');
    }

    // Verifica se o usuário possui alguma das roles necessárias
    const hasRequiredRole = requiredRoles.some((role) => user.role === role);

    // Se o usuário não possuir a role necessária, acesso é negado
    if (!hasRequiredRole) {
      throw new ForbiddenException('Acesso negado para esse tipo de usuário');
    }

    // Caso todas as verificações passem, o acesso é liberado
    return true;
  }
}
