FROM node:22-alpine AS builder 

WORKDIR /app

COPY . ./

RUN npm ci --include=dev

EXPOSE 3333

CMD ["node", "src/server.js"]