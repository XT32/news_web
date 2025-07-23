# Laravel News Web

Modern news website built with Laravel 12, React 19, and Inertia.js featuring role-based authentication and content management.

## Features

- **Role-Based Authentication**: Admin, Employee, and User roles with specific permissions
- **Admin Dashboard**: Monitoring and analytics for website performance
- **Employee Panel**: Content creation and management for news articles
- **User Interface**: Clean, responsive design for reading news
- **Soft Delete**: Articles are soft-deleted to maintain data integrity
- **Real-time Updates**: Live content updates with Inertia.js

## Technology Stack

- **Backend**: Laravel 12, MySQL 8.0
- **Frontend**: React 19, Inertia.js, Tailwind CSS
- **Tools**: Vite, NPM, Composer

## Quick Start

### Prerequisites

- PHP 8.2+
- Node.js 18+
- MySQL 8.0+
- Composer

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd news_web
   ```

2. **Start development environment**
   ```bash
   ./dev-start.sh
   ```
   
   Or manually:
   ```bash
   # Install dependencies
   composer install
   npm install
   
   # Setup environment
   cp .env.example .env
   php artisan key:generate
   
   # Database setup
   php artisan migrate
   php artisan db:seed
   
   # Start servers
   composer run dev
   ```

3. **Access the application**
   - Laravel API: http://localhost:8000
   - React Frontend: http://localhost:5173

## User Roles & Access

### Admin
- **Purpose**: Monitor website performance and manage employees
- **Access**: 
  - Dashboard with analytics and charts
  - Employee performance monitoring
  - User registration trends
  - Category management
- **Restrictions**: Cannot create/edit articles (monitoring only)

### Employee
- **Purpose**: Create and manage news content
- **Access**:
  - Article creation and editing
  - Personal dashboard with statistics
  - Content management tools
- **Features**: Full CRUD operations on articles with soft delete

### User
- **Purpose**: Read news content
- **Access**: 
  - Browse and read articles
  - User dashboard
  - Account management
- **Privacy**: Admin cannot manage individual user data (privacy compliance)

## Development Commands

```bash
# Start development servers
composer run dev

# Database operations
php artisan migrate
php artisan db:seed
php artisan migrate:fresh --seed

# Clear caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Run tests
php artisan test

# Frontend development
npm run dev       # Start Vite dev server
npm run build     # Build for production
npm run lint      # Check code quality
npm run format    # Format code with Prettier
```

## Database Structure

- **Users**: Authentication with role-based permissions
- **News**: Articles with soft delete, categories, and view tracking
- **Categories**: Organize news content
- **Roles**: Admin, Employee, User permissions
- **Soft Deletes**: Maintain data integrity for deleted articles

## API Endpoints

### Public Routes
- `GET /` - Home page with news listing
- `GET /news/{slug}` - Individual article view
- `GET /category/{slug}` - Category news listing

### Authentication
- `GET /login` - Login page
- `POST /login` - Authenticate user
- `GET /register` - Registration page
- `POST /register` - Create new user account

### Admin Routes (Protected)
- `GET /admin/dashboard` - Analytics dashboard
- `GET /admin/users` - Employee management
- `GET /admin/categories` - Category management

### Employee Routes (Protected)
- `GET /employee/dashboard` - Employee dashboard
- `GET /employee/news` - Article management
- `POST /employee/news` - Create new article
- `PUT /employee/news/{id}` - Update article
- `DELETE /employee/news/{id}` - Soft delete article

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development/)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
