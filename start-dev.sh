#!/bin/bash

# Start Laravel + React development servers for GitHub Codespaces
echo "🚀 Starting Laravel API + React Frontend development servers..."

# Function to check if port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

# Start MySQL if not running
if ! check_port 3306; then
    echo "🗄️ Starting MySQL database..."
    sudo service mysql start
fi

# Wait for database to be ready
echo "⏳ Waiting for database connection..."
until php artisan migrate:status >/dev/null 2>&1; do
    sleep 1
done

# Start Laravel API server in background
if ! check_port 8000; then
    echo "🔗 Starting Laravel API server on port 8000..."
    php artisan serve --host=0.0.0.0 --port=8000 &
    LARAVEL_PID=$!
    echo "Laravel API PID: $LARAVEL_PID"
fi

# Start React dev server with Vite in background
if ! check_port 5173; then
    echo "⚛️ Starting React dev server (Vite HMR) on port 5173..."
    npm run dev &
    VITE_PID=$!
    echo "React Vite PID: $VITE_PID"
fi

echo "✅ Full stack development servers started!"
echo ""
echo "🔗 Laravel API: http://localhost:8000"
echo "⚛️ React Frontend: http://localhost:5173"
echo ""
echo "📝 Available commands:"
echo "  - npm run lint      # Check React code quality"
echo "  - npm run format    # Format React code with Prettier"
echo "  - php artisan route:list  # List API routes"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for interrupt signal
trap "echo '🛑 Stopping servers...'; kill $LARAVEL_PID $VITE_PID 2>/dev/null; exit 0" INT

# Keep script running
while true; do
    sleep 1
done
