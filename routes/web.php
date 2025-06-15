<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;


Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');

Route::middleware(['auth'])->group(function () {
    Route::get('/user-dashboard', [DashboardController::class, 'userDashboard'])->name('user.dashboard');
    Route::get('/employee-dashboard', [DashboardController::class, 'employeeDashboard'])->name('employee.dashboard');
});
require __DIR__.'/auth.php';
