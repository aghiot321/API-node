# Primeira API Node.js com Fastify, Drizzle ORM e PostgreSQL

Este projeto é uma API simples desenvolvida em Node.js utilizando Fastify, Drizzle ORM e PostgreSQL. O objetivo é servir como base para estudos e experimentação com backend moderno, tipagem forte e banco de dados relacional.

## Funcionalidades
- Cadastro de cursos (com título único)
- Listagem de cursos
- Validação de dados com Zod
- Documentação automática de rotas (OpenAPI)

## Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)
- [Fastify](https://www.fastify.io/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repo>
   cd primeira-api
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o banco de dados:**
   - Crie um banco PostgreSQL local ou use Docker.
   - Configure as variáveis de ambiente no arquivo `.env`:
     ```env
     DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco
     ```

4. **Rode as migrações:**
   ```bash
   npx drizzle-kit migrate
   # ou
   npm run db:migrate
   ```

5. **Inicie o servidor em modo desenvolvimento:**
   ```bash
   npm run dev
   ```

6. **Acesse a API:**
   - Listar cursos: `GET http://localhost:3333/courses`
   - Criar curso: `POST http://localhost:3333/courses` (body: `{ "title": "Nome do Curso" }`)

## Estrutura de Pastas
```
├── src
│   ├── database
│   │   ├── client.ts
│   │   └── schema.ts
│   └── routes
│       └── create-course.ts
├── server.ts
├── package.json
├── .env
└── README.md
```

## Observações
- O projeto utiliza validação de dados e impede cadastro de cursos com nomes duplicados.
- Para customizar as rotas ou adicionar novas funcionalidades, edite os arquivos em `src/routes`.

## Diagrama do Fluxo da Aplicação

```mermaid
flowchart TD
    A([Usuário])
    B([API Fastify])
    C{Validação Zod}
    D{Curso já existe?}
    E([Drizzle ORM])
    F([Banco PostgreSQL])
    G([201 - Curso criado])
    H([400 - Erro de validação])
    I([400 - Curso já existe])
    J([200 - Lista de cursos])

    %% Fluxo de criação
    A -- POST /courses --> B
    B --> C
    C -- Inválido --> H
    C -- Válido --> D
    D -- Sim --> I
    D -- Não --> E
    E --> F
    F --> G

    %% Fluxo de listagem
    A -- GET /courses --> B
    B --> E
    E --> F
    F --> J
```

---

Feito com ❤️ para estudos!
