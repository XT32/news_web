# Stage Node for React/Vite
FROM node:20 AS nodebuild
WORKDIR /app
COPY resources/ resources/
COPY package*.json ./
RUN npm install
RUN npm run build

# Stage Composer for Laravel
FROM composer:2 AS composerbuild
WORKDIR /app
COPY . .
RUN composer install --no-dev --optimize-autoloader

# Production Stage
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev libonig-dev libxml2-dev zip unzip git curl

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Copy app files
WORKDIR /var/www
COPY --from=composerbuild /app ./
COPY --from=nodebuild /app/resources/dist ./public/build

# Set permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Expose port
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]