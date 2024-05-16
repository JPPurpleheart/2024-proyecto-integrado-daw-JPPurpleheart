<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMatriculasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('matriculas', function (Blueprint $table) {
            $table->id();
            $table->biginteger('id_alumno')->unsigned();
            $table->foreign('id_alumno')->references('id')->on('alumnos');
            $table->biginteger('id_curso')->unsigned();
            $table->foreign('id_curso')->references('id')->on('cursos');
            $table->biginteger('id_clase')->unsigned();
            $table->foreign('id_clase')->references('id')->on('clases');
            $table->integer('comp_curso');
            $table->integer('comp_clase');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('matriculas');
    }
}
