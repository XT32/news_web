
# Laravel + React + Vite + MySQL for GitHub Codespaces
FROM ubuntu:24.04

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    zip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libcurl4-openssl-dev \
    libssl-dev \
    software-properties-common \
    sudo \
    vim \
    nano \
    htop \
    && add-apt-repository ppa:ondrej/php -y \
    && apt-get update \
    && apt-get install -y php8.2 php8.2-cli php8.2-fpm php8.2-mysql php8.2-xml php8.2-mbstring php8.2-curl php8.2-zip php8.2-gd php8.2-bcmath php8.2-tokenizer php8.2-json php8.2-redis \
    && apt-get install -y nodejs npm mysql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Create non-root user for Codespaces
RUN groupadd --gid 1000 vscode \
    && useradd --uid 1000 --gid 1000 -m vscode \
    && echo vscode ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/vscode \
    && chmod 0440 /etc/sudoers.d/vscode

# Set working directory
WORKDIR /var/www

# Change ownership of working directory
RUN chown -R vscode:vscode /var/www

# Switch to vscode user
USER vscode

# Copy composer files first for better layer caching
COPY --chown=vscode:vscode composer.json composer.lock ./
# Install PHP dependencies early for cache
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

# Copy package files for better layer caching
COPY --chown=vscode:vscode package.json package-lock.json ./
# Install Node dependencies early for cache
RUN npm ci --only=production

# Copy the rest of the application
COPY --chown=vscode:vscode . .

# Set permissions
RUN sudo chown -R vscode:vscode /var/www/storage /var/www/bootstrap/cache \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Switch back to root for final setup
USER root

# Expose ports
EXPOSE 8000 5173

# Default command
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
