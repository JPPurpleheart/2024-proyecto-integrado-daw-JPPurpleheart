import { Component, OnChanges, OnInit } from '@angular/core';
import { ClaseService } from 'src/app/core/services/cursos/clase.service';
import { CursoService } from 'src/app/core/services/cursos/curso.service';
import { MatriculaService } from 'src/app/core/services/usuarios/matricula.service';
import { ActivatedRoute, Router } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { AuthHandlerService } from 'src/app/core/services/login/auth-handler.service';

@Component({
  selector: 'app-show-class',
  templateUrl: './show-class.component.html',
  styleUrls: ['./show-class.component.css']
})

export class ShowClassComponent implements OnInit {

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

  constructor(public cursosService: CursoService, public claseService: ClaseService, public matriculaService: MatriculaService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router, private http: HttpClient, public authHandler: AuthHandlerService) { }

  ngOnInit(): void {
    const userType = this.authHandler.getLoggedInUserType();
    if (userType !== 'profesor' && userType !== 'alumno') {
      this.router.navigateByUrl('login'); // Redirect to login
    }
    this.claseId = Number(this.route.snapshot.paramMap.get('id_class'));
    this.cursoId = Number(this.route.snapshot.paramMap.get('id_course'));
    this.getCurso(this.cursoId);
    this.getMatriculas();
    this.getMatriculaToUpdate();
    this.getClase();
    this.getClases();
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
    console.log(this.clasesData);
  }

  getClases() {
    this.claseService.index().subscribe(data =>{
      this.clasesList = data;
      console.log(this.clasesList);
    });
  }

  getMatriculas() {
    this.matriculaService.index().subscribe(data =>{
      this.matriculasList = data;
      console.log(this.matriculasList);
    });
  }

  getCurso(id: any) {
    this.cursosService.show(id).subscribe(data => {
      this.cursoData.id = data.id;
      this.cursoData.nombre = data.nombre;
      console.log(this.cursoData);
    });
  }

  getMatriculaToUpdate() {
    this.matriculaService.findByCourse(this.cursoId, this.claseId).subscribe(data =>{
      this.matriculasToUpdate = data;
    });
  }

  onClickedNextClass(idCurso: number, idClase: number) {
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
        this.claseService.findByCourse(idCurso, idClase).subscribe((clasesData) => {
          if(clasesData) {
            this.idNextClass = clasesData.id;
            console.log(this.idNextClass);
            this.matriculaService.update(this.matriculasToUpdate[0].id, matriculaUpdate).subscribe((data: any) => {
              this.router.navigateByUrl("/class/show/"+this.idNextClass+"/"+idCurso);
            });
          } else {
            this.matriculaService.update(this.matriculasToUpdate[0].id, matriculaUpdate).subscribe((data: any) => {
              this.router.navigateByUrl("/class/show/"+idClase+"/"+idCurso);
            });
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  onClickedFinishCourse(idCurso: number) {
    this.matriculaService.findEnrollmentByCourse(idCurso).subscribe(cursos => {
      let allClassesCompleted = true; // Flag to track completion status
  
      for (let curso of cursos) {
        // Check if any class has comp_class set to 0
        if (curso.comp_clase !== 1) {
          allClassesCompleted = false;
          break; // Exit loop if a class is not completed (comp_class !== 1)
        }
      }
  
      if (allClassesCompleted) {
        // All classes completed, navigate to exam
        this.router.navigateByUrl("/exam/show/" + idCurso);
      } else {
        // Block navigation, display message (optional)
        window.alert("¡No todas las clases completadas para este curso!");
        // You can also display a message to the user, e.g., using a toast notification
      }
    });
  }

}