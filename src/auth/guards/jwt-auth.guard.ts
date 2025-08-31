import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// protege rotas que exigem autenticação
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
