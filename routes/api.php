<?php

use App\Http\Controllers\NewsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

// Endpoint admin: daftar user publik dan aktivitasnya
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('/public-users-activity', [AuthenticatedSessionController::class, 'publicUsersActivity']);
});

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


// Endpoint universal: gabungkan berita lokal & API
Route::get('/news', [NewsController::class, 'getAllNews']);
Route::get('/news/local', [NewsController::class, 'getLocalNews']);
Route::get('/news/api', [NewsController::class, 'getApiNews']);
Route::get('/news/trending', [NewsController::class, 'getTrendingNews']);
Route::post('/news/sync-api', [NewsController::class, 'syncApiNews']);



// Endpoint dashboard admin (statistik & berita terpopuler)
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('/top-news', [NewsController::class, 'getPopularNews']);
    Route::get('/employee-stats', [NewsController::class, 'getEmployeePerformance']);
    Route::get('/global-stats', function() {
        $userCount = \App\Models\User::count();
        $newsCount = \App\Models\News::count();
        return response()->json(['users' => $userCount, 'news' => $newsCount]);
    });
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
    // Route admin/jurnalis hanya di sini
    Route::post('/news', [NewsController::class, 'uploadNews']);
    // Endpoint berita karyawan (dashboard interaktif)
    Route::get('/employee/news', [NewsController::class, 'getEmployeeNews']);
    // Tambahkan route edit/delete jika perlu
});

Route::post('/login', [AuthenticatedSessionController::class, 'apiLogin']);
