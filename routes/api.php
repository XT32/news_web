<?php

use App\Http\Controllers\NewsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/news/local', [NewsController::class, 'getLocalNews']);
Route::get('/news/api', [NewsController::class, 'getApiNews']);
Route::get('/news/trending', [NewsController::class, 'getTrendingNews']);
Route::post('/news/sync-api', [NewsController::class, 'syncApiNews']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
    // Route admin/jurnalis hanya di sini
    Route::post('/news', [NewsController::class, 'uploadNews']);
    // Tambahkan route edit/delete jika perlu
});

Route::post('/login', [AuthenticatedSessionController::class, 'apiLogin']);
