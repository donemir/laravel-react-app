<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\UserController;
use App\Http\Controllers\MessageController;

use App\Events\MyEvent;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/myevent', function () {
    event(new MyEvent('hello world'));
    return 'Hello!';
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::get('/userstest', [MessageController::class, 'userTest']);
Route::get('/messages', [MessageController::class, 'index'])->name('messages.index');
Route::get('/messages/fetch/{user}', [MessageController::class, 'fetchMessages'])->name('messages.fetch'); //fetch messages that can move to api as well
Route::post('/messages/{recipient}', [MessageController::class, 'store']);
Route::get('/messages/{senderId}/mark-as-seen', [MessageController::class, 'markAsSeen']);

// get unread messages
Route::get('/user/{user}/lastUnreadMessages', [UserController::class, 'lastUnreadMessages'])
    ->name('user.lastUnreadMessages');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/avatar-update', [ProfileController::class, 'avatarUpdate'])->name('profile.avatarUpdate');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/fetch-user-data', [UserController::class, 'fetchUserData'])->name('user.data');
});

require __DIR__.'/auth.php';
