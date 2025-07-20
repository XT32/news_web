<?php

use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

// Global Landing Page (Publik)
Route::get('/', function () {
    // Landing page benar-benar global, tanpa data user/berita
    return Inertia::render('Landing');
})->name('landing');

// SPA Login/Register handled by Auth controllers (see routes/auth.php)

// ======================== ADMIN ROUTES ========================
Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/', function () {
        $user = Auth::user();
        abort_unless($user->roles->pluck('name')->contains('admin'), 403);
        return Inertia::render('Admin/AdminDashboard');
    })->name('admin.dashboard');

    // Data seluruh user & karyawan
    Route::get('/users', fn() => Inertia::render('Admin/Users'))->name('admin.users');
    Route::get('/employees', fn() => Inertia::render('Admin/Employees'))->name('admin.employees');

    // Data seluruh berita (audit), performa berita, statistik interaksi
    Route::get('/news', fn() => Inertia::render('Admin/NewsManagement'))->name('admin.news');
    Route::get('/news-performance', fn() => Inertia::render('Admin/NewsPerformance'))->name('admin.news.performance');
    Route::get('/employee-performance', fn() => Inertia::render('Admin/EmployeePerformance'))->name('admin.employee.performance');
});

// ======================== EMPLOYEE ROUTES ========================
Route::middleware(['auth', 'verified'])->prefix('employee')->group(function () {
    Route::get('/', function () {
        $user = Auth::user();
        abort_unless($user->roles->pluck('name')->contains('karyawan'), 403);
        return Inertia::render('Employee/EmployeeDashboard');
    })->name('employee.dashboard');

    // CRUD berita (upload, edit, soft delete)
    Route::get('/news', fn() => Inertia::render('Employee/NewsDashboard'))->name('employee.news');
    Route::get('/news/list', [NewsController::class, 'getEmployeeNews'])->name('employee.news.list');
    Route::post('/news', [NewsController::class, 'uploadNews'])->name('employee.news.upload');
    Route::put('/news/{id}', [NewsController::class, 'updateNews'])->name('employee.news.update');
    Route::delete('/news/{id}', [NewsController::class, 'softDeleteNews'])->name('employee.news.softdelete');
    Route::post('/news/{id}/restore', [NewsController::class, 'restoreNews'])->name('employee.news.restore');

    // Statistik berita sendiri
    Route::get('/news/{id}/stats', [NewsController::class, 'employeeNewsStats'])->name('employee.news.stats');
});

// ======================== USER (READER) ROUTES ========================
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $user = Auth::user();
        return Inertia::render('User/Dashboard', [
            'user' => $user,
            'notifications' => $user->notifications ?? [],
        ]);
    })->name('user.dashboard');

    // Profile, notification, ganti password
    // Route profile handled below (ProfileController@edit)
    Route::get('/notifications', fn() => Inertia::render('User/Notifications'))->name('user.notifications');
    Route::get('/password/change', fn() => Inertia::render('User/ChangePassword'))->name('user.password.change');
});

// ...existing code...

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

require __DIR__.'/auth.php';
