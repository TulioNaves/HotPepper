FROM php:8.2-cli

# Instalar extensões comuns para Laravel + Node.js/NPM para os assets
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
     git unzip curl nodejs npm \
  && docker-php-ext-install pdo pdo_mysql \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar manifests e instalar dependências PHP antes (melhora build)
COPY backend/composer.json backend/composer.lock ./

# Instalar o Composer e rodar com --no-scripts para evitar o erro do artisan
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
  && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
  && php -r "unlink('composer-setup.php');" \
  && composer install --no-interaction --prefer-dist --no-progress --no-scripts

# Preparar npm/Vite (agora funciona pois instalamos o npm acima)
COPY backend/package.json backend/package-lock.json ./
RUN (test -f package.json && npm ci) || true

# Copia o restante do código
COPY backend/ ./

# Otimiza o autoload e prepara o projeto agora que o artisan já está na pasta
RUN composer dump-autoload --optimize

EXPOSE 8000

# Comando para manter o servidor do Laravel rodando acessível na rede do Docker
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]