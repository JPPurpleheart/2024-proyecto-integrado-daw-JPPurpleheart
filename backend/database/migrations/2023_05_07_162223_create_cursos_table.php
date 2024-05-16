<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCursosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cursos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 255);
            $table->biginteger('profesor')->unsigned();
            $table->foreign('profesor')->references('id')->on('profesors');
            $table->biginteger('itinerario')->unsigned();
            $table->foreign('itinerario')->references('id')->on('itinerarios');
            $table->string('foto_curso', 255)->nullable();
            $table->string('descripcion', 255)->nullable();
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
        Schema::dropIfExists('cursos');
    }
}
