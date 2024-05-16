import { Component, OnChanges, OnInit } from '@angular/core';
import { ClaseService } from 'src/app/core/services/cursos/clase.service';
import { CursoService } from 'src/app/core/services/cursos/curso.service';
import { MatriculaService } from 'src/app/core/services/usuarios/matricula.service';
import { ActivatedRoute, Router } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-show-class',
  templateUrl: './show-class.component.html',
  styleUrls: ['./show-class.component.css']
})

export class ShowClassComponent implements OnInit, OnChanges {

  cursoData:any = {
    id: '',
    nombre: ''
  };
  clasesData:any = {
    nombre: '',
    ruta_acceso: ''
  };
  isLinkClicked = false;
  videoUrl:any = "";
  clasesList:any = [];
  matriculasList:any = [];
  matriculasToUpdate:any = [];
  cursoId:number = 0;
  claseId: number = 0;
  idNextClass: any = 0;

  constructor(public cursosService: CursoService, public claseService: ClaseService, public matriculaService: MatriculaService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.claseId = Number(this.route.snapshot.paramMap.get('id_class'));
    this.cursoId = Number(this.route.snapshot.paramMap.get('id_course'));
    this.getClase();
    this.getCurso(this.cursoId);
    this.getClases();
    this.getMatriculas();
    this.getMatriculaToUpdate();
  }

  ngOnChanges() {
    this.getClase();
  }

  getClase() {
    this.claseService.show(this.claseId).subscribe(data =>{
      this.cursoId = data.id_curso;
      this.clasesData.nombre = data.nombre;
      this.clasesData.ruta_acceso = data.ruta_acceso;
      let dangerousVideoUrl = 'https://www.youtube.com/embed/' + this.clasesData.ruta_acceso;
      this.videoUrl =
          this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
    });
  }

  getClases() {
    this.claseService.index().subscribe(data =>{
      this.clasesList = data;
    });
  }

  getMatriculas() {
    this.matriculaService.index().subscribe(data =>{
      this.matriculasList = data;
    });
  }

  getCurso(id: any) {
    this.cursosService.show(id).subscribe(data => {
      this.cursoData.id = data.id;
      this.cursoData.nombre = data.nombre;
    });
  }

  getMatriculaToUpdate() {
    this.matriculaService.findByCourse(this.cursoId, this.claseId).subscribe(data =>{
      this.matriculasToUpdate = data;
    });
  }

  onClickedNextClass(idCurso: number, idClase: number, event: any) {
    event.preventDefault();
    try {      
      if (!this.matriculasToUpdate) {
        throw new Error('Datos de matrícula no encontrados');
      } else {
        let matriculaUpdate = {
          id: this.matriculasToUpdate[0].id,
          id_alumno: this.matriculasToUpdate[0].id_alumno,
          id_curso: this.matriculasToUpdate[0].id_curso,
          id_clase: this.matriculasToUpdate[0].id_clase,
          comp_curso: 0,
          comp_clase: 1
        };
        console.log(this.matriculasToUpdate[0].id);
        console.log(matriculaUpdate);
        this.claseService.findByCourse(idCurso, idClase).subscribe(clasesData => {
          this.idNextClass = clasesData.id;
          console.log(this.idNextClass);
          this.matriculaService.update(this.matriculasToUpdate[0].id, matriculaUpdate).subscribe((data: any) => {
            this.router.navigateByUrl("/class/show/"+this.idNextClass+"/"+idCurso);  
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  onClickedFinishCourse(idCurso: number) {
    // return this.documentoService.completeCurso(idCurso);
  }

}

