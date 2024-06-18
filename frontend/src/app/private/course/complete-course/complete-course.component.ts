import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/core/services/cursos/curso.service';
import { ItinerarioService } from 'src/app/core/services/cursos/itinerario.service';
import { AuthHandlerService } from 'src/app/core/services/login/auth-handler.service';
import { ProfesorService } from 'src/app/core/services/usuarios/profesor.service';
import { UsuarioService } from 'src/app/core/services/usuarios/usuario.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

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

  constructor(public cursosService: CursoService, public itinerariosService: ItinerarioService, public profesorsService: ProfesorService, public usuariosService: UsuarioService, private route: ActivatedRoute, private router: Router, public authHandler: AuthHandlerService) { }

  ngOnInit(): void {
    const userType = this.authHandler.getLoggedInUserType();
    if (userType !== 'profesor' && userType !== 'alumno') {
      this.router.navigateByUrl('login'); // Redirect to login
    }
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

  generatePDF(itinerario: number) {
    let username = "";
    this.usuariosService.show(this.authHandler.getLoggedInUserId()).subscribe(data => {
      username = data.name;
      let docDef = {
        content: [
          '¡Felicitaciones ' + username + '!' + '\nAcabas de completar el curso de ' + this.cursoData.nombre + ' impartido por el pastor ' + this.usuarioData.nombre + '.\nOseas 4:6 dice: Mi pueblo fue destruido, porque le faltó conocimiento. Por cuanto desechaste el conocimiento, yo te echaré del sacerdocio; y porque olvidaste la ley de tu Dios, también yo me olvidaré de tus hijos.\na lo que Proverbios 1:7 añade: El principio de la sabiduría es el temor de Jehová; Los insensatos desprecian la sabiduría y la enseñanza.\nPor tanto recuerda que todo el conocimiento adquirido no te sirve de nada si no eres capaz de llevarlo a la práctica como dice Jesús en Juan 14:15: Si me amáis, guardad mis mandamientos. Así que te exhorto a guardar cada palabra de verdad que has aprendido en este curso.'
        ]
      };
      pdfMake.createPdf(docDef).open();
      this.router.navigateByUrl("/pathway/"+this.cursoData.itinerario);
    });
  }

}
