import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Farmácia Popular API')
  .setDescription('API para gerenciamento da farmácia popular')
  .setVersion('1.0')
  .addBearerAuth() // Habilita autenticação via JWT no Swagger
  .build();
