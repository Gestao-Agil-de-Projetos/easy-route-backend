FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

ENV NODE_ENV=production

CMD if [ "$NODE_ENV" = "development" ]; then \
      npx prisma migrate dev --name init && \
      node --watch --inspect --watch-path=./src --trace-warnings ./src/server.js; \
    else \
      npx prisma migrate deploy && \
      node ./src/server.js; \
    fi