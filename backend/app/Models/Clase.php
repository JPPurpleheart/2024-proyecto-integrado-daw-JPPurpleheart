<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clase extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'id',
        'nombre',
        'ruta_acceso',
        'descripcion',
        'id_curso',
        'created_at',
        'updated_at'
    ];
}
