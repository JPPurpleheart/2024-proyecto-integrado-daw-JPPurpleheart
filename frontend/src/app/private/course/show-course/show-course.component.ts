import { Component, OnInit } from '@angular/core';
import { ClaseService } from 'src/app/core/services/cursos/clase.service';
import { CursoService } from 'src/app/core/services/cursos/curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthHandlerService } from 'src/app/core/services/login/auth-handler.service';
import { MatriculaService } from 'src/app/core/services/usuarios/matricula.service';

@Component({
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.css']
})
export class ShowCourseComponent implements OnInit {

  cursoData:any = {
    id: '',
    nombre: '',
    itinerario: ''
  };
  clasesList:any = [];
  clasesId:any = 0;
  cursoId: any = "";
  userType:string = "";
  userId:Number = 0;
  profesor: any = "profesor";

  constructor(public cursosService: CursoService, public matriculaService: MatriculaService, public claseService: ClaseService, public authhandler: AuthHandlerService, private route: ActivatedRoute, public router: Router, public authHandler: AuthHandlerService) { }

  ngOnInit(): void {
    const userType = this.authHandler.getLoggedInUserType();
    if (userType !== 'profesor' && userType !== 'alumno') {
      this.router.navigateByUrl('login'); // Redirect to login
    }
    this.cursoId = Number(this.route.snapshot.paramMap.get('id_course'));
    this.getClases();
    this.getCursos();
    this.userType = this.authhandler.getLoggedInUserType();
    this.userId = this.authhandler.getLoggedInUserId();
  }

  getCursos() {
    this.cursosService.show(this.cursoId).subscribe(data => {
      this.cursoData.id = data.id;
      this.cursoData.nombre = data.nombre;
      this.cursoData.itinerario = data.itinerario;
    });
  }

  getClases() {
    this.claseService.index().subscribe(data => {
      this.clasesList = data;
      console.log(this.clasesList);
    });
  
    this.claseService.findClassesByCourse(this.cursoId).subscribe((data) => {
      // Extract the id of the first element using helper function
      const claseId = this.getClaseId(data);
  
      if (claseId) {
        this.clasesId = claseId;
        console.log(this.clasesId); // Output: 3
      } else {
        console.log("No clases found");
      }
    });
  }
  
  getClaseId(claseData: any[]): number | null {
    if (claseData && claseData.length > 0) {
      return claseData[0].id;
    } else {
      return null;
    }
  }
  
  matriculaAlumno() {
    console.log(this.cursoId);
    this.claseService.findClassesByCourse(this.cursoId).subscribe((data) => {
      console.log(data);
      // Iterate through each class in the retrieved data
      for (const clase of data) {
        this.matriculaService.findByCourse(this.cursoId, clase.id).subscribe((data: any) => {
          console.log(data);
          if (Array.isArray(data) && data.length === 0) {
            const matriculaAlumno = {
              id_alumno: this.userId,
              id_curso: this.cursoId,
              id_clase: clase.id,
              comp_curso: 0,
              comp_clase: 0
            };
            console.log(matriculaAlumno);
            // Store the enrollment information for each class
            this.matriculaService.store(matriculaAlumno).subscribe(
              () => console.log(`Enrollment stored for class ${clase.id}`),
              error => console.error('Error storing enrollment:', error)
            );
          } else {
            console.log("¡Alumno ya matriculado!");
          }
        });
      }
    });
  }

}
