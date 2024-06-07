import { Component, OnInit } from '@angular/core';
import { ClaseService } from 'src/app/core/services/cursos/clase.service';
import { CursoService } from 'src/app/core/services/cursos/curso.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store-class',
  templateUrl: './store-class.component.html',
  styleUrls: ['./store-class.component.css']
})
export class StoreClassComponent implements OnInit {

  form = {
    nombre:'',
    ruta_acceso: ''
  };
  id_curso: any = "";
  default_errors_front: any = {
    error_ruta_acceso: 'Introduce tu link de YouTube'
  };
  // cursoList:any = [];
  ruta_acceso = this.form.ruta_acceso.split('https://www.youtube.com/watch?v=')[1];

  constructor(public cursosService: CursoService, private route: ActivatedRoute, public claseService: ClaseService, private router: Router) { }

  ngOnInit(): void {
    this.id_curso = this.route.snapshot.paramMap.get('id_course');
    // this.getCurso();
  }

  // getCurso() {
  //   this.cursosService.index().subscribe(data =>{
  //     this.cursoList = data;
  //   });
  // }

  addClass() {
    let formData = {
      nombre: this.form.nombre,
      ruta_acceso: this.form.ruta_acceso.split('https://www.youtube.com/watch?v=')[1],
      id_curso: this.id_curso
    };
    return this.claseService.store(formData).subscribe(data => {
      this.router.navigateByUrl('/exam/store/' + this.id_curso);
      // this.router.navigateByUrl('/course/' + this.id_curso);
    });
  }

}
