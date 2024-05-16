<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matricula extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'id',
        'id_alumno',
        'id_curso',
        'id_clase',
        'comp_curso',
        'comp_clase',
        'created_at',
        'updated_at'
    ];
}
