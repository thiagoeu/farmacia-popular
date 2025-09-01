# 💊 Farmácia Popular

## 📝 Descrição

Projeto de Farmácia Popular desenvolvido com o framework **NestJS**. O sistema contempla autenticação de usuários, gerenciamento de funcionários e produtos, utilizando banco de dados relacional com suporte a autenticação via JWT.

---

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [Passport](http://www.passportjs.org/)
- [JWT](https://jwt.io/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js/)
- [class-validator](https://github.com/typestack/class-validator)
- [class-transformer](https://github.com/typestack/class-transformer)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- Tratamento de erros com **Exception Filters** personalizados

---

## 📁 Estrutura do Projeto

```bash
├── docker-compose.yml            # Configuração de containers Docker
├── src/                          # Código-fonte da aplicação
│   ├── main.ts                   # Arquivo principal da aplicação
│   ├── app.module.ts             # Módulo raiz
│   ├── app.controller.ts         # Controller principal
│   ├── app.controller.spec.ts    # Testes do controller principal
│   ├── app.service.ts            # Serviço principal
│
│   ├── auth/                     # Módulo de autenticação
│   │   ├── auth.controller.ts
│   │   ├── auth.controller.spec.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── decorators/
│   │   │   ├── current-user.ts
│   │   │   └── roles.decorators.ts
│   │   ├── dto/
│   │   │   └── login.dto.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   └── strategies/
│   │       └── jwt.strategy.ts
│
│   ├── config/                   # Arquivos de configuração
│   │   └── db.config.ts
│
│   ├── funcionario/              # Módulo de funcionários
│   │   ├── funcionario.controller.ts
│   │   ├── funcionario.controller.spec.ts
│   │   ├── funcionario.module.ts
│   │   ├── funcionario.service.ts
│   │   ├── funcionario.service.spec.ts
│   │   ├── dto/
│   │   │   ├── create-funcionario.dto.ts
│   │   │   └── update-funcionario.dto.ts
│   │   ├── entities/
│   │   │   └── funcionario.entity.ts
│
│   ├── produto/                  # Módulo de produtos
│   │   ├── produto.controller.ts
│   │   ├── produto.module.ts
│   │   ├── produto.service.ts
│   │   ├── dto/
│   │   │   ├── create-produto.dto.ts
│   │   │   └── update-produto.dto.ts
│   │   ├── entities/
│   │   │   └── produto.entity.ts
│
│   ├── users/                    # Módulo de usuários
│   │   ├── users.controller.ts
│   │   ├── users.controller.spec.ts
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   ├── users.service.spec.ts
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   ├── list-all-users.dto.ts
│   │   │   └── update-user.dto.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│
│   ├── shared/                   # Recursos compartilhados
│   │   ├── enums/
│   │   │   └── role.enum.ts
│   │   └── filters/
│   │       └── all-exceptions.filter.ts
```
