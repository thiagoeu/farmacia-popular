import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Custom decorator @CurrentUser()
 *
 * Esse decorator é usado para acessar o objeto "user" que foi
 * anexado à requisição pelo sistema de autenticação (ex: AuthGuard).
 *
 * Isso facilita obter o usuário autenticado diretamente nos métodos dos controllers,
 * sem precisar acessar manualmente `req.user`.
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // Acessa o contexto HTTP da requisição
    const request = ctx.switchToHttp().getRequest();

    // Retorna o usuário autenticado (definido no AuthGuard, geralmente via JWT)
    return request.user;
  },
);
