#!/bin/bash

# Laravel News Web - Environment Setup Script
echo "🔧 Setting up Laravel News Web environment..."

# Use system PHP instead of the problematic one
export PATH="/usr/bin:$PATH"

# Check PHP version
echo "📋 Checking PHP..."
php_version=$(php --version | head -n 1)
echo "PHP Version: $php_version"

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

# Install Composer dependencies if vendor doesn't exist
if [ ! -d "vendor" ]; then
    echo "📦 Installing Composer dependencies..."
    if command -v composer &> /dev/null; then
        composer install --no-interaction --optimize-autoloader
    else
        echo "❌ Composer not found. Please install Composer first."
        exit 1
    fi
else
    echo "✅ Vendor directory already exists"
fi

# Generate application key if not set
if ! grep -q "APP_KEY=base64:" .env; then
    echo "🔑 Generating application key..."
    php artisan key:generate --no-interaction
    echo "✅ Application key generated"
else
    echo "✅ Application key already exists"
fi

# Install NPM dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing NPM dependencies..."
    npm install
    echo "✅ NPM dependencies installed"
else
    echo "✅ node_modules already exists"
fi

# Create database tables (using SQLite for simplicity in development)
echo "🗄️ Setting up database..."

# Update .env to use SQLite
if ! grep -q "DB_CONNECTION=sqlite" .env; then
    echo "📝 Updating database configuration to SQLite..."
    sed -i 's/DB_CONNECTION=mysql/DB_CONNECTION=sqlite/' .env
    sed -i 's/DB_HOST=127.0.0.1/#DB_HOST=127.0.0.1/' .env
    sed -i 's/DB_PORT=3306/#DB_PORT=3306/' .env
    sed -i 's/DB_DATABASE=news_web/#DB_DATABASE=news_web/' .env
    sed -i 's/DB_USERNAME=root/#DB_USERNAME=root/' .env
    sed -i 's/DB_PASSWORD=/#DB_PASSWORD=/' .env
fi

# Create SQLite database file
touch database/database.sqlite

# Run migrations
echo "🏗️ Running database migrations..."
php artisan migrate --no-interaction

# Optionally seed the database
read -p "🌱 Do you want to seed the database with sample data? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    php artisan db:seed --no-interaction
    echo "✅ Database seeded"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the development environment:"
echo "  npm run dev (in one terminal for frontend)"
echo "  php artisan serve (in another terminal for backend)"
echo ""
echo "Or run the combined development script:"
echo "  ./dev-start.sh"
