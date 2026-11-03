
FROM node:20-alpine

WORKDIR /app

# Cache melhorando: instalar deps primeiro
COPY package.json package-lock.json ./
RUN npm ci

# Copiar código
COPY . ./

EXPOSE 5173

