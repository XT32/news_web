#!/bin/bash

# Setup script for GitHub Codespaces
echo "🚀 Setting up Laravel React News Web for GitHub Codespaces..."

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
while ! mysqladmin ping -h db -u xt -padminxt32 --silent; do
    sleep 1
done

# Install dependencies
echo "📦 Installing Composer dependencies..."
composer install --no-interaction --prefer-dist --optimize-autoloader

echo "📦 Installing NPM dependencies..."
npm install

# Setup Laravel
echo "🔧 Setting up Laravel..."
cp .env.example .env.codespaces || cp .env .env.codespaces

# Generate application key if needed
if ! grep -q "APP_KEY=base64:" .env; then
    php artisan key:generate
fi

# Set proper permissions
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# Run migrations and seeders
echo "🗄️ Running database migrations..."
php artisan migrate --force

echo "🌱 Running database seeders..."
php artisan db:seed --force

# Build assets
echo "🎨 Building frontend assets..."
npm run build

# Clear Laravel caches
echo "🧹 Clearing Laravel caches..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

echo "✅ Setup complete! Your Laravel app is ready for GitHub Codespaces."
echo "🌐 Access your app at the forwarded port 8000"
echo "⚡ Start the dev server with: npm run dev"
