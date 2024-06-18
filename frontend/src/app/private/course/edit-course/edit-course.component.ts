import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/core/services/usuarios/usuario.service';
import { ProfesorService } from 'src/app/core/services/usuarios/profesor.service';
import { ItinerarioService } from 'src/app/core/services/cursos/itinerario.service';
import { CursoService } from 'src/app/core/services/cursos/curso.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthHandlerService } from 'src/app/core/services/login/auth-handler.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  form = {
    nombre:'',
    profesor: '',
    itinerario: ''
  };
  id:Number = 0;
  usuarioList:any = [];
  profesorList:any = [];
  itinerarioList:any = [];
  cursoData:any = {
    nombre:'',
    profesor: '',
    itinerario: ''
  };

  constructor(public usuarioService: UsuarioService, public profesorService: ProfesorService, public itinerarioService: ItinerarioService, public cursoService: CursoService, private route: ActivatedRoute, private router: Router, public authHandler: AuthHandlerService) { }

  ngOnInit(): void {
    const userType = this.authHandler.getLoggedInUserType();
    if (userType !== 'profesor' && userType !== 'alumno') {
      this.router.navigateByUrl('login'); // Redirect to login
    }
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getCurso();
    this.getProfesor();
    this.getItinerario();
    this.getUsuario();
  }

  getUsuario() {
    this.usuarioService.index().subscribe(data =>{
      this.usuarioList = data;
    });
  }

  getProfesor() {
    this.profesorService.index().subscribe(data =>{
      this.profesorList = data;
    });
  }

  getItinerario() {
    this.itinerarioService.index().subscribe(data =>{
      this.itinerarioList = data;
    });
  }

  getCurso() {
    this.cursoService.show(this.id).subscribe(data => {
      this.cursoData.nombre = data.nombre;
      this.cursoData.profesor = data.profesor;
      this.cursoData.itinerario = data.itinerario;
    });
  }

  editCourse() {
    console.log(this.form)
    return this.cursoService.update(this.id, this.form).subscribe(data => {
      this.router.navigateByUrl('/course/' + this.id);
    });
  }

}