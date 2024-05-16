<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('examens', function (Blueprint $table) {
            $table->id();
            $table->biginteger('id_curso')->unsigned();
            $table->foreign('id_curso')->references('id')->on('cursos');
            $table->string('pregunta', 255);
            $table->string('opcion_a', 255);
            $table->string('opcion_b', 255);
            $table->string('opcion_c', 255);
            $table->string('opcion_d', 255);
            $table->string('opcion_correcta', 255);
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
        Schema::dropIfExists('examens');
    }
}
