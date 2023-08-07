<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BusinessController;
use App\Http\Controllers\FileController;

use App\Http\Controllers\FormController;
use App\Http\Controllers\FormDataController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


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

use Illuminate\Support\Facades\Mail;

Route::get('/send-test-mail', function () {
    $recipientEmail = 'amir.khajedehi@gmail.com';

    Mail::raw('This is a test email content.', function ($message) use ($recipientEmail) {
        $message->to($recipientEmail)
                ->subject('Test Email');
    });

    return "Test mail sent successfully to $recipientEmail";
});

use App\Events\FormSubmitted;

Route::get('/test-form-event', function () {
    $formData = [
        'firstName' => 'John',
        'lastName' => 'Doe',
        'emailAddress' => 'johndoe@example.com',
        'signature' => 'signature_file_name.jpg', // Replace this with the actual filename of the signature
        // Add other form data here...
    ];

    event(new FormSubmitted($formData));

    return 'Event dispatched successfully!';
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/panel', function () {
    return Inertia::render('Panel');
})->name('panel');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/avatar-update', [ProfileController::class, 'avatarUpdate'])->name('profile.avatarUpdate');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/business', [BusinessController::class, 'edit'])->name('business.edit');
    Route::patch('/business', [BusinessController::class, 'update'])->name('business.update');
});



Route::get('/master-form', [FormController::class, 'showMasterForm'])->name('form.showMaster');
Route::get('/test-form', [FormController::class, 'showTestForm'])->name('form.showTestForm');
Route::get('/validation-form', [FormController::class, 'ShowValidationTest'])->name('form.showValidationTest');
Route::post('/test-form', [FormController::class, 'submitForm'])->name('form.submitForm');
Route::post('/validation-form', [FormController::class, 'submitValidationTest'])->name('form.submitValidationTest');


// Dental Forms
Route::get('/dp-pi-form', [FormController::class, 'showDPPIForm'])->name('form.showDPPIForm');
Route::post('/dp-pi-form', [FormController::class, 'submitDPPIForm'])->name('form.submitDPPIForm');



// Route::get('/{slug}', [BusinessController::class, 'show'])->name('business.show');


Route::get('/forms', [FormDataController::class, 'index'])->name('forms.index');
Route::get('/forms/{id}', [FormDataController::class, 'show'])->name('forms.show');
Route::get('forms/generate-pdf/{id}', [FormDataController::class, 'generatePdf'])->name('forms.generatePdf');


// ***Show the Signature
Route::get('/signatures/{filename}', function ($filename) {
    // Make sure the filename is properly sanitized to prevent directory traversal attacks
    $filePath = storage_path('app/signatures/' . $filename);

    // Check if the file exists in the storage directory
    if (file_exists($filePath)) {
        // Return the image file using the response()->file() method
        return response()->file($filePath);
    } else {
        // If the file does not exist, return a default image or an error response
        // For example, you can return a 404 Not Found response or a default placeholder image
        return response()->file(storage_path('app/default-placeholder-image.png'));
    }
});




require __DIR__.'/auth.php';
