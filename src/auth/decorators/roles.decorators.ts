import { SetMetadata } from '@nestjs/common';
import { Role } from '../../shared/enums/role.enum';

// Chave usada para armazenar os metadados de roles no contexto da rota.
// Essa constante será usada depois para recuperar os dados com o Reflector.
export const ROLES_KEY = 'roles';

/**
 * Decorador personalizado `@Roles()` usado para definir os papéis (roles)
 * necessários para acessar um endpoint protegido.
 *
 * Esse decorador aplica metadados à rota usando `SetMetadata`, que serão
 * lidos por um guard (ex: RolesGuard) para verificar se o usuário tem permissão.
 *
 * Exemplo de uso:
 *   @Roles(Role.Admin)
 *   @Get('admin-only')
 *   findAdminData() {}
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
