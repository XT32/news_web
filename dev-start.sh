#!/bin/bash

# Laravel News Web - Development Server Starter
echo "🚀 Starting Laravel News Web Development Environment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    php artisan key:generate
fi

# Check if vendor directory exists
if [ ! -d "vendor" ]; then
    echo "📦 Installing Composer dependencies..."
    composer install
fi

# Check if node_modules directory exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing NPM dependencies..."
    npm install
fi

# Check database connection and run migrations
echo "🗄️ Setting up database..."
php artisan migrate --graceful

# Seed database if needed
read -p "🌱 Do you want to seed the database? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    php artisan db:seed
fi

echo "✅ Environment setup complete!"
echo ""
echo "🚀 Starting development servers..."
echo "🔗 Laravel API: http://localhost:8000"
echo "⚛️ React Frontend: http://localhost:5173"
echo ""

# Start Laravel and Vite dev servers concurrently
composer run dev
