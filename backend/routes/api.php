<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AlumnoController;
use App\Http\Controllers\ProfesorController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\ItinerarioController;
use App\Http\Controllers\ClaseController;
use App\Http\Controllers\ExamenController;
use App\Http\Controllers\MatriculaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('signup', [AuthController::class, 'signup']);

Route::post('login', [AuthController::class, 'login']);

Route::group(['middleware' => 'api'], function ($router) {

    Route::post('login', [AuthController::class, 'login']);
    // Route::post('logout', [AuthController::class, 'logout']);
    // Route::post('refresh', [AuthController::class, 'refresh']);
    // Route::post('me', [AuthController::class, 'me']);

});

Route::get('/usuarios', [UserController::class, 'index']);
Route::get('/usuarios/{id}', [UserController::class, 'show']);
Route::get('/usuarios/findUser/{username}', [UserController::class, 'findIdByUsername']);
Route::post('/usuarios/create', [UserController::class, 'store']);
Route::put('/usuarios/update/{id}', [UserController::class, 'update']);
Route::delete('/usuarios/delete/{id}', [UserController::class, 'destroy']);

Route::get('/alumnos', [AlumnoController::class, 'index']);
Route::get('/alumnos/{id}', [AlumnoController::class, 'show']);
Route::post('/alumnos/create', [AlumnoController::class, 'store']);
Route::put('/alumnos/update/{id}', [AlumnoController::class, 'update']);
Route::delete('/alumnos/delete/{id}', [AlumnoController::class, 'destroy']);

Route::get('/profesores', [ProfesorController::class, 'index']);
Route::get('/profesores/{id}', [ProfesorController::class, 'show']);
Route::post('/profesores/create', [ProfesorController::class, 'store']);
Route::put('/profesores/update/{id}', [ProfesorController::class, 'update']);
Route::delete('/profesores/delete/{id}', [ProfesorController::class, 'destroy']);

Route::get('/cursos', [CursoController::class, 'index']);
Route::get('/cursos/{id}', [CursoController::class, 'show']);
Route::post('/cursos/create', [CursoController::class, 'store']);
Route::put('/cursos/update/{id}', [CursoController::class, 'update']);
Route::delete('/cursos/delete/{id}', [CursoController::class, 'destroy']);

Route::get('/itinerarios', [ItinerarioController::class, 'index']);
Route::get('/itinerarios/{id}', [ItinerarioController::class, 'show']);
Route::post('/itinerarios/create', [ItinerarioController::class, 'store']);
Route::put('/itinerarios/update/{id}', [ItinerarioController::class, 'update']);
Route::delete('/itinerarios/delete/{id}', [ItinerarioController::class, 'destroy']);

Route::get('/clases', [ClaseController::class, 'index']);
Route::get('/clases/{id}', [ClaseController::class, 'show']);
Route::get('/clases/findByCourse/{id_curso}/{id_clase}', [ClaseController::class, 'findByCourse']);
Route::get('/clases/findClassesByCourse/{id_curso}', [ClaseController::class, 'findClassesByCourse']);
Route::post('/clases/create', [ClaseController::class, 'store']);
Route::put('/clases/update/{id}', [ClaseController::class, 'update']);
Route::delete('/clases/delete/{id}', [ClaseController::class, 'destroy']);

Route::get('/examenes', [ExamenController::class, 'index']);
Route::get('/examenes/{id}', [ExamenController::class, 'show']);
Route::get('/examenes/findQuestionsByCourse/{id_curso}', [ExamenController::class, 'findQuestionsByCourse']);
Route::post('/examenes/create', [ExamenController::class, 'store']);
Route::put('/examenes/update/{id}', [ExamenController::class, 'update']);
Route::delete('/examenes/delete/{id}', [ExamenController::class, 'destroy']);

Route::get('/matriculas', [MatriculaController::class, 'index']);
Route::get('/matriculas/{id}', [MatriculaController::class, 'show']);
Route::get('/matriculas/find/{id_alumno}', [MatriculaController::class, 'find']);
Route::get('/matriculas/findByCourse/{id_curso}/{id_clase}', [MatriculaController::class, 'findByCourse']);
Route::get('/matriculas/findEnrollmentByCourse/{id_curso}', [MatriculaController::class, 'findEnrollmentByCourse']);
Route::post('/matriculas/create', [MatriculaController::class, 'store']);
Route::put('/matriculas/update/{id}', [MatriculaController::class, 'update']);
Route::delete('/matriculas/delete/{id}', [MatriculaController::class, 'destroy']);