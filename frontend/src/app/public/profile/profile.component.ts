import { Component, OnInit } from '@angular/core';
import { AfterLoginService } from 'src/app/core/services/login/after-login.service';
import { UsuarioService } from 'src/app/core/services/usuarios/usuario.service';
import { AlumnoService } from 'src/app/core/services/usuarios/alumno.service';
import { ProfesorService } from 'src/app/core/services/usuarios/profesor.service';
import { CursoService } from 'src/app/core/services/cursos/curso.service';
import { ItinerarioService } from 'src/app/core/services/cursos/itinerario.service';
import { Router } from '@angular/router';

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
  }
  email: any = "";
  info_profesor: any = "";

  constructor(public afterLoginService: AfterLoginService, public usuarioService: UsuarioService, public alumnoService: AlumnoService, public profesorService: ProfesorService, public cursoService: CursoService, public itinerarioService: ItinerarioService, private router: Router) { }

  ngOnInit(): void {
    this.userType = this.afterLoginService.getLoggedInUserType();
    this.userId = this.afterLoginService.getLoggedInUserId();
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
    } else {
      this.alumnoService.show(userId).subscribe(data => {
        this.email = data.email;
      });
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
