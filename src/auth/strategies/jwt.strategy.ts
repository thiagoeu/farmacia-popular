import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
// Implementa a estratégia de autenticação JWT utilizando Passport
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      // Extrai o token do header Authorization como Bearer Token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Chave secreta usada para verificar a assinatura do token
      secretOrKey: process.env.JWT_SECRET || 'jwt-secret',
    });
  }

  // Método chamado automaticamente pelo Passport para validar o token decodificado
  async validate(payload: any) {
    try {
      // Recupera o usuário com base no ID armazenado no token (payload.sub)
      const user = await this.usersService.findOne(payload.sub);

      // Retorna os dados que estarão disponíveis no request (ex: req.user)
      return {
        user,
        role: user.role,
      };
    } catch (e) {
      // Se não conseguir validar o usuário, lança exceção de não autorizado
      throw new UnauthorizedException('Token inválido');
    }
  }
}
