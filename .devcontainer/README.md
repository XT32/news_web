# Codespaces Configuration for Laravel React News Web

This repository is optimized for GitHub Codespaces development with **Laravel backend** and **React frontend**.

## Stack Overview

- **Backend**: Laravel 12 (PHP 8.2)
- **Frontend**: React 19 with Vite
- **Database**: MySQL 8.0
- **Styling**: CSS-in-JS with styled-components + Tailwind CSS utility classes
- **State Management**: React hooks
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: React Icons
- **Routing**: React Router DOM + Inertia.js

## Quick Start

1. Open this repository in GitHub Codespaces
2. Wait for the automatic setup to complete
3. Start the development servers:
   ```bash
   # Option 1: Use the convenience script
   ./start-dev.sh
   
   # Option 2: Manual start in separate terminals
   # Terminal 1: Start Laravel API server
   php artisan serve --host=0.0.0.0 --port=8000
   
   # Terminal 2: Start React/Vite dev server
   npm run dev
   ```

## Available Ports

- **8000**: Laravel API backend
- **5173**: React frontend (Vite dev server with HMR)
- **3306**: MySQL database

## React Development Commands

```bash
# Install dependencies
npm install
composer install

# React development
npm run dev          # Start Vite dev server with hot reload
npm run build        # Build for production

# Laravel API
php artisan serve    # Start Laravel API server
php artisan migrate  # Run database migrations
php artisan db:seed  # Seed database with test data

# Database operations
php artisan migrate:fresh --seed  # Fresh migration with seeding

# Clear caches (when needed)
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

## React Project Structure

```
resources/js/
├── components2/           # Reusable React components
├── Layouts/              # Layout components (AuthenticatedLayout, GuestLayout)
├── Pages/                # Page components (mapped to Laravel routes)
│   ├── Profile/          # Profile management pages
│   └── ...
├── services/             # API service functions
└── app.jsx              # Main React application entry point
```

## Environment

The application will automatically use `.env.codespaces` configuration optimized for Codespaces environment.

## React Development Features

- ✅ **Hot Module Replacement (HMR)** - Instant updates without losing state
- ✅ **React DevTools** - Browser extension support
- ✅ **Component Auto-import** - Intelligent imports for React components
- ✅ **JSX Syntax Highlighting** - Full JSX support
- ✅ **React Snippets** - Code snippets for faster development
- ✅ **Auto Component Rename** - Rename components across files
- ✅ **Path IntelliSense** - Smart import path completion
- ✅ **ESLint Integration** - Code quality and consistency
- ✅ **TypeScript Ready** - Optional TypeScript support

## VS Code Extensions Included

- **React Development**:
  - Simple React Snippets
  - Auto Rename Tag
  - Path IntelliSense
  - TypeScript and JavaScript Language Features
  
- **Laravel Development**:
  - PHP Intelephense
  - Laravel Blade Syntax
  - Laravel Extra IntelliSense
  
- **General Development**:
  - ESLint
  - Docker
  - Git Graph

## Troubleshooting

**React/Vite Issues:**
- If HMR stops working: Restart `npm run dev`
- If components don't update: Check browser console for errors
- Port 5173 conflicts: Vite will auto-assign another port

**Laravel API Issues:**
- Database connection: Check if MySQL container is running
- Migration errors: Run `php artisan migrate:fresh`
- Cache issues: Run `php artisan cache:clear`

**General Issues:**
1. Rebuild the devcontainer: `Ctrl+Shift+P` → "Codespaces: Rebuild Container"
2. Check the setup log in the terminal
3. Manually run setup: `bash .devcontainer/setup.sh`

## API Integration

The React frontend communicates with Laravel backend via:
- **Inertia.js** for seamless SPA experience
- **Axios** for additional API calls
- **Laravel Sanctum** for authentication

Example API usage in React:
```javascript
import { router } from '@inertiajs/react';

// Navigate to Laravel route
router.get('/dashboard');

// Post data to Laravel
router.post('/news', formData);
```
