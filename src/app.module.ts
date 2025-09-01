import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { databaseConfig } from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './produto/produto.module';
import { FuncionarioModule } from './funcionario/funcionario.module';

import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import { WinstonLoggerProvider } from './shared/middleware/logger.provider';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    ProdutoModule,
    FuncionarioModule,
  ],
  controllers: [AppController],
  providers: [AppService, WinstonLoggerProvider],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
