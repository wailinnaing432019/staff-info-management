<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\staff\StaffController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
 
Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard',[DashboardController::class,'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('/employees', StaffController::class);
    });
    Route::get('/employees/{id}/format18pdf', [StaffController::class, 'format18Pdf'])->name('staff.format18Pdf');
    Route::get('/employees/{id}/format36pdf', [StaffController::class, 'format36Pdf'])->name('staff.format36Pdf');
    Route::get('/employees/{id}/format25pdf', [StaffController::class, 'format25Pdf'])->name('staff.format25Pdf');
    Route::get('/employees/{id}/format55pdf', [StaffController::class, 'format55Pdf'])->name('staff.format55Pdf');

    Route::get('/api/check-staff-number', [StaffController::class, 'checkStaffNumber']);
    Route::get('/allEmployees',[StaffController::class,'format25Page'])->name('format25page');
require __DIR__.'/auth.php';
