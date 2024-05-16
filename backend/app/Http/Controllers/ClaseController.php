<?php

namespace App\Http\Controllers;

use App\Models\Clase;
use Illuminate\Http\Request;

class ClaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Clase::all();
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
        return Clase::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Clase::findOrFail($id);
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
        return Clase::select('id')
            ->where('id_curso', $id_curso)
            ->where('id', '>', $id_clase)
            ->orderBy('id', 'asc')
            ->first();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id_curso
     * @return \Illuminate\Http\Response
     */
    public function findClassesByCourse($id_curso)
    {
        return Clase::select('id')
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
        return Clase::find($id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Clase::findOrFail($id)->delete();
    }
}
