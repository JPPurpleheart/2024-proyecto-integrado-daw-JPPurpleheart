import { Component, OnInit } from '@angular/core';
import { ItinerarioService } from 'src/app/core/services/cursos/itinerario.service';
import { CursoService } from 'src/app/core/services/cursos/curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthHandlerService } from 'src/app/core/services/login/auth-handler.service';
import { MatriculaService } from 'src/app/core/services/usuarios/matricula.service';

@Component({
  selector: 'app-show-pathway',
  templateUrl: './show-pathway.component.html',
  styleUrls: ['./show-pathway.component.css']
})
export class ShowPathwayComponent implements OnInit {

  itinerarioData:any = {
    id: '',
    nombre: ''
  };
  cursosList:any = [];
  id_itinerario: any = "";
  userType:string = "";
  userId:number = 0;
  profesor:any = "profesor";
  matriculasList:any = [];

  constructor(public itinerarioService: ItinerarioService, public cursoService: CursoService, private route: ActivatedRoute, public matriculaService: MatriculaService, public router: Router, public authHandler: AuthHandlerService) { }

  ngOnInit(): void {
    const userType = this.authHandler.getLoggedInUserType();
    if (userType !== 'profesor' && userType !== 'alumno') {
      this.router.navigateByUrl('login'); // Redirect to login
    }
    this.id_itinerario = Number(this.route.snapshot.paramMap.get(':id_pathway'));
    this.getItinerarios();
    this.getCursos();
    this.userType = this.authHandler.getLoggedInUserType();
    this.userId = this.authHandler.getLoggedInUserId();
  }

  getItinerarios() {
    this.itinerarioService.show(this.id_itinerario).subscribe(data => {
      this.itinerarioData.id = data.id;
      this.itinerarioData.nombre = data.nombre;
    });
  }

  getCursos() {
    this.cursoService.index().subscribe(data =>{
      this.cursosList = data;
    });
  }

  // getMatriculas() {
  //   this.matriculaService.index().subscribe(data =>{
  //     this.matriculasList = data;
  //     console.log(this.matriculasList);
  //   });
  // }

}
