FROM laravelsail/php82-composer:latest

# Install Node.js 20.x dan npm terbaru
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get update \
    && apt-get install -y nodejs git \
    && npm install -g npm@latest vite

# Set working directory
WORKDIR /var/www

# Copy existing application directory contents
COPY . /var/www

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Install Node dependencies
RUN npm install

# Expose ports for Laravel and Vite
EXPOSE 8000 5173

CMD ["/bin/bash"]
