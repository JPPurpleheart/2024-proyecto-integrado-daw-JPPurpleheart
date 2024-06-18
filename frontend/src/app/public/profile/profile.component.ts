import { Component, OnInit } from '@angular/core';
import { AuthHandlerService } from 'src/app/core/services/login/auth-handler.service';
import { UsuarioService } from 'src/app/core/services/usuarios/usuario.service';
import { AlumnoService } from 'src/app/core/services/usuarios/alumno.service';
import { ProfesorService } from 'src/app/core/services/usuarios/profesor.service';
import { CursoService } from 'src/app/core/services/cursos/curso.service';
import { ItinerarioService } from 'src/app/core/services/cursos/itinerario.service';
import { Router } from '@angular/router';
import { MatriculaService } from 'src/app/core/services/usuarios/matricula.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userType: string = "";
  userId: number = 0;
  profesor: any = "profesor";
  userData: any = {
    name: '',
    username: '',
    cursos: [
      {
        id: '',
        nombre_curso: '',
        nombre_itinerario: ''
      }
    ]
  };
  cursos: any = {
    id: 0,
    nombre_curso: '',
    nombre_itinerario: '',
    alumnosEnrolled: [],
  }
  email: any = "";
  info_profesor: any = "";

  constructor(public authhandler: AuthHandlerService, public usuarioService: UsuarioService, public alumnoService: AlumnoService, public profesorService: ProfesorService, public cursoService: CursoService, public itinerarioService: ItinerarioService, public matriculaService: MatriculaService, private router: Router) { }

  ngOnInit(): void {
    this.userType = this.authhandler.getLoggedInUserType();
    if (this.userType !== 'profesor' && this.userType !== 'alumno') {
      this.router.navigateByUrl('login'); // Redirect to login
    }
    this.userId = this.authhandler.getLoggedInUserId();
    this.getData(this.userId, this.userType);
  }

  getData(userId: number, userType: string) {
    this.usuarioService.show(userId).subscribe(data => {
      this.userData.name = data.name;
      this.userData.username = data.username;
    });
    if(userType == this.profesor) {
      this.profesorService.show(userId).subscribe(data => {
        this.info_profesor = data.info_profesor;
      });
      this.cursoService.index().subscribe((data: any) => {
        data.forEach((item: {
          itinerario: any; profesor: number; nombre: any; 
        }) => {
          if (userId == item.profesor) {
              this.userData.cursos.push({
              id: item.itinerario,
                nombre_curso: item.nombre,
                nombre_itinerario: ''
              });
            for (let i = 0; i < this.userData.cursos.length; i++) {
              const curso = this.userData.cursos[i];
              this.itinerarioService.show(curso.id).subscribe(data => {
                for (let j = 0; j < this.userData.cursos.length; j++) {
                  const userCurso = this.userData.cursos[j];
                  if (userCurso.nombre_curso === curso.nombre_curso) {
                    userCurso.nombre_itinerario = data.nombre;
                  }
                }
              });
            }
          }
        });
      });
      // 1. Find all courses created by the professor
      this.cursoService.findCursosByProfesor(userId).subscribe((cursos: any[]) => {
        this.cursos = []; // Initialize empty cursos array
        cursos.forEach((curso: { itinerario: any; profesor: number; nombre: any }) => {
          this.cursos.push({
            id: curso.itinerario,
            nombre_curso: curso.nombre,
            nombre_itinerario: '',
            alumnosEnrolled: [], // Array to store enrolled students
          });
        });

      // 2. Find enrolled students for each course (separate loop)
      this.cursos.forEach((curso: { id: number; alumnosEnrolled: any[] }) => {
        this.matriculaService.findEnrollmentByCourse(curso.id).subscribe(matriculas => {
          matriculas.forEach((matricula: { id_alumno: any }) => {
            // 3. Find user data for each enrolled student
            this.usuarioService.show(matricula.id_alumno).subscribe(alumnoData => {
              const existingStudent = curso.alumnosEnrolled.find(
                (student: { nombreAlumno: string }) => student.nombreAlumno === alumnoData.name
              );
              if (!existingStudent) {
                curso.alumnosEnrolled.push({
                  nombreAlumno: alumnoData.name,
                  usernameAlumno: alumnoData.username,
                });
              }
            });
          });
        });
      });
    });
    } else {
      this.alumnoService.show(userId).subscribe(data => {
        this.email = data.email;
      });
      this.matriculaService.find(userId).subscribe(matriculas => {
        matriculas.forEach((matricula: {id_curso: any}) => {
          this.cursoService.index().subscribe((data: any) => {
            data.forEach((item: {
              itinerario: any; id: number; nombre: any; 
          }) => {
              if (matricula.id_curso == item.id) {
                this.userData.cursos.push({
                  id: item.itinerario,
                  nombre_curso: item.nombre,
                  nombre_itinerario: ''
                });
                for (let i = 0; i < this.userData.cursos.length; i++) {
                  const curso = this.userData.cursos[i];
                  this.itinerarioService.show(curso.id).subscribe(data => {
                    for (let j = 0; j < this.userData.cursos.length; j++) {
                      const userCurso = this.userData.cursos[j];
                      if (userCurso.nombre_curso === curso.nombre_curso) {
                        userCurso.nombre_itinerario = data.nombre;
                      }
                    }
                  });
                }
              }
            });
          });}
        )
      })
    }
  }

  deleteUser(event: MouseEvent) {
    event.preventDefault();
    if (this.userType == "alumno"){
      this.alumnoService.delete(this.userId);
    } else {
      this.profesorService.delete(this.userId);
    }
    this.usuarioService.delete(this.userId);
    this.router.navigateByUrl('/login');
  }

}
