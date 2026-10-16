<?php

use App\Http\Controllers\ActorController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserWatchlistController;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {

  Route::resource('categories', CategoryController::class);
  Route::resource('generals', GeneralController::class);
  Route::resource('actors', ActorController::class);

  Route::post('/movies', [MovieController::class, 'store']);
  Route::delete('/movies/{movie}', [MovieController::class, 'destroy']);
  Route::get('/users', [UserController::class, 'index']);
});

Route::middleware(['auth:sanctum',])->group(function () {
  Route::post('/logout', [AuthController::class, 'logout']);
  Route::get('/current-user', [AuthController::class, 'currentUser']);
  Route::post('/userwatchlists', [UserWatchlistController::class, 'store']);
  Route::delete('/userwatchlists/{id}', [UserWatchlistController::class, 'destroy']);
  Route::get('/get-userwatchlist/{id}', [UserController::class, 'getUserWatchList']);
});

Route::post('/create-account', [UserController::class, 'createAccount']);
Route::get('/movies/{id}', [MovieController::class, 'show']);
Route::get('generals', [GeneralController::class, 'index']);
Route::get('/movies', [MovieController::class, 'index']);
Route::post('/login', [AuthController::class, 'login']);


