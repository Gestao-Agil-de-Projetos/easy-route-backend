# easy-route-backend

Este repositório contém a API backend da aplicação **Easy Route**, construída com Node.js, Fastify e Prisma, conectando-se a um banco MySQL.

---

## 1. Como rodar a aplicação

### 1️⃣ Rodando com Docker Compose

Sobe **a aplicação e o banco MySQL** juntos:

```bash
docker compose up -d
```

Parar os containers:

```bash
docker compose down
```

### 2️⃣ Rodando apenas a aplicação via Docker

Se você já possui o MySQL ativo:

```bash
docker build -t easy-route-backend-app .
docker run -p 3000:3000 --env-file .env easy-route-backend-app
```

### 3️⃣ Rodando localmente no Node.js

```bash
npm install
npm run start:dev    # modo desenvolvimento com watch e inspector
# ou
node ./src/server.js
```

Certifique-se de configurar corretamente o arquivo .env apontando para o banco de dados.

## 2. Estrutura do Projeto

Abaixo está uma visão geral das pastas e arquivos principais do **easy-route-backend** e suas funções:

easy-route-backend

```
├─ prisma
├─ src
│ ├─ config
│ ├─ controllers
│ ├─ database
│ ├─ http
│ ├─ middlewares
│ ├─ repositories
| ├─ routes
│ ├─ services
│ ├─ utils
│ ├─ validation
│ ├─ app.js
│ └─ server.js
├─ .gitignore
├─ docker-compose.yml
├─ Dockerfile
└─ package.json
```

### 📂 prisma

Contém os arquivos do **Prisma**:

- `schema.prisma` → define os modelos do banco e a conexão.
- `migrations/` → scripts de migração do banco.
- `prisma-client/` → código gerado pelo Prisma Client.

### 📂 src

Pasta principal do código-fonte da aplicação.

#### config

Arquivos de configuração da aplicação.

#### controllers

Responsáveis por **receber e processar requisições HTTP**, chamando serviços e retornando respostas.

#### database

Configuração da conexão com o banco de dados, integração com ORM (Prisma).

#### http

Pode conter arquivos relacionados à camada HTTP da aplicação.

#### middlewares

Funções executadas **antes ou depois das rotas**, por exemplo autenticação, logging, tratamento de erros.

#### repositories

Camada de acesso aos dados, isolando a lógica de banco do restante da aplicação.

#### routes

Camada de roteamento da aplicação, primeira a receber as requisições.

#### services

Lógica principal da aplicação, serviços que processam dados e chamam repositórios.

#### utils

Funções utilitárias gerais, helpers e ferramentas compartilhadas entre a aplicação.

#### validation

Schemas ou validações de entrada, garantindo que dados enviados via requisição estejam corretos.

#### app.js

Instancia o **Fastify**, configura middlewares, rotas e logger.  
Exporta a instância do app para ser utilizada no server ou em testes.

#### server.js

Ponto de entrada da aplicação. Inicia o servidor, define porta e host, e chama `app.js`.

### 📄 .gitignore

Lista arquivos e pastas que não devem ser versionados, como `node_modules` e arquivos de log.

### 📄 docker-compose.yml

Orquestração dos containers **app + banco MySQL**, definindo volumes, portas e variáveis de ambiente.

### 📄 Dockerfile

Define como construir a imagem Docker da aplicação Node.js, instalando dependências e configurando o Prisma.

### 📄 package.json

Gerencia dependências, scripts de execução (`start:dev`, `start`, etc.) e informações do projeto.

## 3. Como Contribuir

Para manter o projeto organizado e consistente, siga as seguintes práticas ao contribuir:

### 1️⃣ Criar uma branch

- Sempre **baseie sua branch na `main` (ou `master`)**.
- Nomeie sua branch de acordo com o tipo de trabalho que está realizando:

| Tipo de trabalho             | Prefixo da branch | Exemplo        |
| ---------------------------- | ----------------- | -------------- |
| Nova funcionalidade          | `feature/0000`    | `feature/1234` |
| Correção de bug              | `bugfix/0000`     | `bugfix/4321`  |
| Débito técnico / refatoração | `debt/0000`       | `debt/9876`    |
| Correção urgente             | `hotfix/0000`     | `hotfix/1234`  |

> O número `0000` pode ser usado para associar a uma issue ou tarefa.

### 2️⃣ Realizar as alterações

- Faça commits claros e descritivos.
- Separe commits por responsabilidade (uma mudança = um commit).
> ⚠️ **Atenção:** Certifique-se de não commitar na branch errada ou subir arquivos que não deveria. Ex: .env.

### 3️⃣ Abrir um Pull Request (PR)

- Sempre abra **PRs para a branch `main`**.
- Descreva no PR:
  - O que foi alterado
  - Por que a alteração é necessária
  - Qualquer detalhe de implementação ou instrução especial

### 4️⃣ Revisão e Merge

- Aguarde a revisão de outro contribuinte ou mantenedor.
- Após aprovação, o PR será mergeado na `main`.
- Evite merge direto na `main` sem PR.

## 4. Diagrama do Banco de Dados

<img width="100%" alt="Diagrama do Banco de Dados" src="https://github.com/user-attachments/assets/1cca2bc2-0107-44d9-9c05-a01cacdec10f" />
