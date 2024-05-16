import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/core/services/cursos/curso.service';
import { ItinerarioService } from 'src/app/core/services/cursos/itinerario.service';
import { ProfesorService } from 'src/app/core/services/usuarios/profesor.service';
import { UsuarioService } from 'src/app/core/services/usuarios/usuario.service';

@Component({
  selector: 'app-complete-course',
  templateUrl: './complete-course.component.html',
  styleUrls: ['./complete-course.component.css']
})
export class CompleteCourseComponent implements OnInit {
  
  cursoData:any = {
    id: 0,
    itinerario: 0,
    profesor: 0,
    nombre: ''
  };
  itinerarioData:any = {
    id: 0,
    nombre: ''
  };
  profesorData:any = {
    id: 0,
    info_profesor: ''
  };
  usuarioData:any = {
    id: 0,
    nombre: ''
  };
  id:number = 0;

  constructor(public cursosService: CursoService, public itinerariosService: ItinerarioService, public profesorsService: ProfesorService, public usuariosService: UsuarioService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id_course'));
    this.getData(this.id);
  }

  getData(id: any) {
    this.cursosService.show(id).subscribe(data => {
      this.cursoData.id = data.id;
      this.cursoData.itinerario = data.itinerario;
      this.cursoData.profesor = data.profesor;
      this.cursoData.nombre = data.nombre;
      this.itinerariosService.show(data.itinerario).subscribe(data => {
        this.itinerarioData.id = data.id;
        this.itinerarioData.nombre = data.nombre;
      });
      this.profesorsService.show(data.profesor).subscribe(data => {
        this.profesorData.id = data.id;
        this.profesorData.info_profesor = data.info_profesor;
        this.usuariosService.show(data.id).subscribe(data => {
          this.usuarioData.id = data.id;
          this.usuarioData.nombre = data.name;
        });
      });
    });
  }

}
