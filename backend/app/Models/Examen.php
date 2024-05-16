<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examen extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'id',
        'id_curso',
        'pregunta',
        'opcion_a',
        'opcion_b',
        'opcion_c',
        'opcion_d',
        'opcion_correcta',
        'created_at',
        'updated_at'
    ];
}
