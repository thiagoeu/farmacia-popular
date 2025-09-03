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
- [Swagger](https://swagger.io/)
- [Nest-Winston](https://www.npmjs.com/package/nest-winston) + [Moment Timezone](https://www.npmjs.com/package/moment-timezone)
- Tratamento de erros com **Exception Filters** personalizados

---

## 📁 Estrutura do Projeto

```bash
├── docker-compose.yml            # Arquivo de configuração do Docker para o banco de dados

├── src                           # Código-fonte principal da aplicação
│   ├── app.controller.spec.ts    # Testes do controller principal
│   ├── app.controller.ts         # Controller principal
│   ├── app.module.ts             # Módulo raiz da aplicação
│   ├── app.service.ts            # Serviço principal da aplicação

│   ├── auth                      # Módulo de autenticação
│   │   ├── auth.controller.spec.ts   # Testes do controller de autenticação
│   │   ├── auth.controller.ts        # Controller responsável pelo login/autenticação
│   │   ├── auth.module.ts            # Módulo de autenticação
│   │   ├── auth.service.ts           # Serviço de autenticação
│   │   ├── decorators                # Decorators personalizados
│   │   │   ├── current-user.ts       # Decorator para acessar o usuário autenticado
│   │   │   └── roles.decorators.ts   # Decorator para definir roles de acesso
│   │   ├── dto
│   │   │   └── login.dto.ts          # DTO para login
│   │   ├── guards
│   │   │   ├── jwt-auth.guard.ts     # Guard de autenticação JWT
│   │   │   └── roles.guard.ts        # Guard de controle de acesso por role
│   │   └── strategies
│   │       └── jwt.strategy.ts       # Estratégia JWT usada pelo Passport

│   ├── config                    # Arquivos de configuração da aplicação
│   │   ├── db.config.ts          # Configuração do TypeORM + dotenv
│   │   └── swagger.config.ts     # Configuração do Swagger (Documentação da API)

│   ├── funcionario               # Módulo para gerenciamento de funcionários
│   │   ├── dto                   # DTOs usados para entrada/validação de dados
│   │   │   ├── create-funcionario.dto.ts
│   │   │   └── update-funcionario.dto.ts
│   │   ├── entities
│   │   │   └── funcionario.entity.ts   # Entidade do TypeORM para funcionário
│   │   ├── funcionario.controller.spec.ts
│   │   ├── funcionario.controller.ts
│   │   ├── funcionario.module.ts
│   │   ├── funcionario.service.spec.ts
│   │   └── funcionario.service.ts

│   ├── main.ts                  # Arquivo de bootstrap da aplicação (ponto de entrada)

│   ├── produto                  # Módulo para gerenciamento de produtos
│   │   ├── dto
│   │   │   ├── create-produto.dto.ts
│   │   │   └── update-produto.dto.ts
│   │   ├── entities
│   │   │   └── produto.entity.ts
│   │   ├── produto.controller.ts
│   │   ├── produto.module.ts
│   │   └── produto.service.ts

│   ├── shared                   # Recursos compartilhados entre módulos
│   │   ├── enums
│   │   │   └── role.enum.ts         # Enum com roles de usuário (ex: ADMIN, USER)
│   │   ├── filters
│   │   │   └── all-exceptions.filter.ts # Filter para tratamento global de exceções
│   │   └── middleware
│   │       ├── logger.middleware.ts    # Middleware de logging com Winston + Moment Timezone
│   │       └── logger.provider.ts      # Provider configurando o Winston logger

│   └── users                   # Módulo de gerenciamento de usuários
│       ├── dto
│       │   ├── create-user.dto.ts
│       │   ├── list-all-users.dto.ts
│       │   └── update-user.dto.ts
│       ├── entities
│       │   └── user.entity.ts
│       ├── users.controller.spec.ts
│       ├── users.controller.ts
│       ├── users.module.ts
│       ├── users.service.spec.ts
│       └── users.service.ts

├── test
│   ├── app.e2e-spec.ts         # Testes end-to-end
│   └── jest-e2e.json           # Configuração do Jest para e2e

├── tsconfig.build.json         # Configuração do TypeScript para build
├── tsconfig.json               # Configuração global do TypeScript
└── yarn.lock                   # Lockfile do Yarn para dependências

```

## 🗄️ Banco de Dados

Para rodar o banco de dados PostgreSQL localmente, utilize o Docker com o arquivo de configuração `docker-compose.yml` que está na raiz do projeto.

### 🚀 Como subir o banco

Na raiz do projeto, execute o comando:

```bash
docker-compose up -d

```

### 🛠️ Configurações do banco

As configurações de conexão estão definidas no arquivo `src/config/db.config.ts` e utilizam as variáveis definidas no arquivo `.env`. Exemplo:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=farmacia-popular


```

## 📄 Documentação - Swagger

Os endpoints podem ser visualizados através da rota:

```bash
localhost:3000/api
```
