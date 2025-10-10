FROM node:20-alpine

WORKDIR /usr/src/app

# Copiar package.json e package-lock.json (se houver)
COPY package*.json ./

# Instalar dependências (inclui devDependencies durante build)
RUN npm install

# Copiar o restante do código
COPY . .

# Gerar client do Prisma para o ambiente do container
RUN npx prisma generate

# Variável de ambiente padrão
ENV NODE_ENV=production

# CMD genérico: em development roda migrate dev + watch; em production deploy + server
CMD if [ "$NODE_ENV" = "development" ]; then \
      npx prisma migrate dev --name init && \
      node --watch --inspect --watch-path=./src --trace-warnings ./src/server.js; \
    else \
      npx prisma migrate deploy && \
      node ./src/server.js; \
    fi
# Dockerfile
FROM node:20-alpine

WORKDIR /usr/src/app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Gerar client do Prisma
RUN npx prisma generate

# Variável de ambiente padrão
ENV NODE_ENV=production

# CMD genérico que checa NODE_ENV
CMD if [ "$NODE_ENV" = "development" ]; then \
      npx prisma migrate dev --name init && \
      node --watch --inspect --watch-path=./src --trace-warnings ./src/server.js; \
    else \
      npx prisma migrate deploy && \
      node ./src/server.js; \
    fi
