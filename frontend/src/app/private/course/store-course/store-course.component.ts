import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/core/services/usuarios/usuario.service';
import { ProfesorService } from 'src/app/core/services/usuarios/profesor.service';
import { ItinerarioService } from 'src/app/core/services/cursos/itinerario.service';
import { CursoService } from 'src/app/core/services/cursos/curso.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AfterLoginService } from 'src/app/core/services/login/after-login.service';

@Component({
  selector: 'app-store-course',
  templateUrl: './store-course.component.html',
  styleUrls: ['./store-course.component.css']
})
export class StoreCourseComponent implements OnInit {

  form = {
    nombre:''
  };
  id_itinerario: any = "";
  id_profesor: any = "";
  // usuarioList:any = [];
  // profesorList:any = [];
  // itinerarioList:any = [];

  constructor(public usuarioService: UsuarioService, public afterLoginService: AfterLoginService, private route: ActivatedRoute, public profesorService: ProfesorService, public itinerarioService: ItinerarioService, public cursoService: CursoService, private router: Router) { }

  ngOnInit(): void {
    this.id_itinerario = this.route.snapshot.paramMap.get('id_pathway');
    this.id_profesor = this.afterLoginService.getLoggedInUserId();
    // this.getUsuario();
    // this.getProfesor();
    // this.getItinerario();
  }

  // getUsuario() {
  //   this.usuarioService.index().subscribe(data =>{
  //     this.usuarioList = data;
  //   });
  // }

  // getProfesor() {
  //   this.profesorService.index().subscribe(data =>{
  //     this.profesorList = data;
  //   });
  // }

  // getItinerario() {
  //   this.itinerarioService.index().subscribe(data =>{
  //     this.itinerarioList = data;
  //   });
  // }

  addCourse() {
    let formUpdated = {
      nombre: this.form.nombre,
      itinerario: this.id_itinerario,
      profesor: this.id_profesor,
    };
    return this.cursoService.store(formUpdated).subscribe(data => {
      this.router.navigateByUrl('/pathway/' + this.id_itinerario);
    });
  }

}
