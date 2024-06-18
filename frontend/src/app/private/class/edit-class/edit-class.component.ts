import { Component, OnInit } from '@angular/core';
import { ClaseService } from 'src/app/core/services/cursos/clase.service';
import { CursoService } from 'src/app/core/services/cursos/curso.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthHandlerService } from 'src/app/core/services/login/auth-handler.service';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {

  form = {
    nombre:'',
    ruta_acceso: '',
    id_curso: ''
  };
  id:Number = 0;
  cursoList:any = [];
  claseData:any = {
    nombre:'',
    ruta_acceso: '',
    id_curso: ''
  };
  default_errors_front: any = {
    error_ruta_acceso: 'Introduce tu link de YouTube'
  };
  ruta_acceso = this.form.ruta_acceso.split('https://www.youtube.com/watch?v=')[1];

  constructor(public cursosService: CursoService, public claseService: ClaseService, private route: ActivatedRoute, private router: Router, public authHandler: AuthHandlerService) { }

  ngOnInit(): void {
    const userType = this.authHandler.getLoggedInUserType();
    if (userType !== 'profesor' && userType !== 'alumno') {
      this.router.navigateByUrl('login'); // Redirect to login
    }
    this.id = Number(this.route.snapshot.paramMap.get('id_class'));
    this.getClase();
    this.getCurso();
  }

  getCurso() {
    this.cursosService.index().subscribe(data =>{
      this.cursoList = data;
    });
  }

  getClase() {
    this.claseService.show(this.id).subscribe(data => {
      this.claseData.nombre = data.nombre;
      this.claseData.ruta_acceso = data.ruta_acceso;
      this.claseData.id_curso = data.id_curso;
    });
  }

  editClass() {
    let formData = {
      nombre: this.form.nombre,
      ruta_acceso: this.form.ruta_acceso.split('https://www.youtube.com/watch?v=')[1],
      id_curso: this.form.id_curso
    };
    return this.claseService.update(this.id, formData).subscribe(data => {
      this.router.navigateByUrl('/course/' + this.claseData.id_curso);
    });
  }

}
