<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Employee\EmployeeDashboardController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

// Public Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/news/{slug}', [HomeController::class, 'show'])->name('news.show');
Route::get('/category/{slug}', [HomeController::class, 'category'])->name('category.show');

// Authentication Routes
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// ======================== ADMIN ROUTES ========================
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/users', [AdminDashboardController::class, 'users'])->name('admin.users');
    Route::get('/categories', [AdminDashboardController::class, 'categories'])->name('admin.categories');
});

// ======================== EMPLOYEE ROUTES ========================
Route::middleware(['auth', 'verified', 'role:employee'])->prefix('employee')->group(function () {
    Route::get('/dashboard', [EmployeeDashboardController::class, 'index'])->name('employee.dashboard');
    Route::get('/news', [EmployeeDashboardController::class, 'news'])->name('employee.news');
    Route::get('/news/create', [EmployeeDashboardController::class, 'createNews'])->name('employee.news.create');
    Route::post('/news', [EmployeeDashboardController::class, 'storeNews'])->name('employee.news.store');
    Route::get('/news/{id}/edit', [EmployeeDashboardController::class, 'editNews'])->name('employee.news.edit');
    Route::put('/news/{id}', [EmployeeDashboardController::class, 'updateNews'])->name('employee.news.update');
    Route::delete('/news/{id}', [EmployeeDashboardController::class, 'deleteNews'])->name('employee.news.delete');
});

// ======================== USER (READER) ROUTES ========================
Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
    Route::get('/dashboard', [UserController::class, 'dashboard'])->name('user.dashboard');
    Route::get('/saved-news', [UserController::class, 'savedNews'])->name('user.saved-news');
    Route::get('/notifications', [UserController::class, 'notifications'])->name('user.notifications');
    Route::get('/preferences', [UserController::class, 'preferences'])->name('user.preferences');
    Route::get('/password/change', [UserController::class, 'changePassword'])->name('user.password.change');
});

// ======================== USER API ROUTES ========================
Route::middleware(['auth', 'verified'])->prefix('api/user')->group(function () {
    Route::get('/recent-news', [UserController::class, 'getRecentNews']);
    Route::get('/saved-news', [UserController::class, 'getUserSavedNews']);
    Route::get('/stats', [UserController::class, 'getUserStats']);
    Route::get('/notifications', [UserController::class, 'getUserNotifications']);
    Route::get('/preferences', [UserController::class, 'getUserPreferences']);
    Route::put('/preferences', [UserController::class, 'updateUserPreferences']);
    Route::post('/save-news', [UserController::class, 'saveNews']);
    Route::delete('/unsave-news/{newsId}', [UserController::class, 'unsaveNews']);
    Route::patch('/notifications/{notificationId}/read', [UserController::class, 'markNotificationAsRead']);
    Route::patch('/notifications/mark-all-read', [UserController::class, 'markAllNotificationsAsRead']);
    Route::delete('/notifications/{notificationId}', [UserController::class, 'deleteNotification']);
});

// ======================== PUBLIC API ROUTES ========================
Route::prefix('api')->group(function () {
    Route::get('/categories', function () {
        return response()->json([
            'success' => true,
            'data' => \App\Models\Category::all()
        ]);
    });
});

// ======================== PUBLIC PAGES ========================
Route::get('/about', fn() => view('about'))->name('about');
Route::get('/contact', fn() => view('contact'))->name('contact');
Route::get('/sitemap.xml', fn() => response()->file(resource_path('views/sitemap.xml')));
Route::get('/robots.txt', fn() => response()->file(resource_path('views/robots.txt')));

// ======================== PROFILE ROUTES ========================
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
