import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { databaseConfig } from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './produto/produto.module';
import { FuncionarioModule } from './funcionario/funcionario.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), UsersModule, AuthModule, ProdutoModule, FuncionarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
