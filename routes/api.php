<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;

use App\Http\Controllers\FormDataController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/file-uploader/tmp-upload', [FileController::class, 'tempUpload'])->name('file.tempUpload');
Route::delete('/file-uploader/tmp-revert', [FileController::class, 'delete'])->name('file.delete'); //this route is not doing anything functional, it's just for preventing errors for not having method


Route::get('/forms', [FormDataController::class, 'index'])->name('api.forms.index');