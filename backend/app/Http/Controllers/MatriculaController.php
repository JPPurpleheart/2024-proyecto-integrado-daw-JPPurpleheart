<?php

namespace App\Http\Controllers;

use App\Models\Matricula;
use Illuminate\Http\Request;

class MatriculaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Matricula::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return Matricula::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Matricula::findOrFail($id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id_alumno
     * @return \Illuminate\Http\Response
     */
    public function find($id_alumno)
    {
        return Matricula::select('id', 'id_alumno', 'id_curso', 'id_clase', 'comp_curso', 'comp_clase')
            ->where('id_alumno', '=', $id_alumno)->get();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id_curso
     * @param  int  $id_clase
     * @return \Illuminate\Http\Response
     */
    public function findByCourse($id_curso, $id_clase)
    {
        return Matricula::select()
            ->where('id_curso', $id_curso)
            ->where('id_clase', $id_clase)
            ->get();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id_curso
     * @return \Illuminate\Http\Response
     */
    public function findEnrollmentByCourse($id_curso)
    {
        return Matricula::select('id', 'id_alumno', 'id_curso', 'id_clase', 'comp_curso', 'comp_clase')
            ->where('id_curso', '=', $id_curso)->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        return Matricula::find($id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Matricula::findOrFail($id)->delete();
    }
}
