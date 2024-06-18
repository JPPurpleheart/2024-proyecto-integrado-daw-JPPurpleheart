import { Component, OnInit } from '@angular/core';
import { ItinerarioService } from 'src/app/core/services/cursos/itinerario.service';
import { CursoService } from 'src/app/core/services/cursos/curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthHandlerService } from 'src/app/core/services/login/auth-handler.service';

@Component({
  selector: 'app-index-pathway',
  templateUrl: './index-pathway.component.html',
  styleUrls: ['./index-pathway.component.css']
})
export class IndexPathwayComponent implements OnInit {

  itinerariosList:any = [];
  cursosList:any = [];
  userType:string = "";
  userId:number = 0;
  profesor:any = "profesor";

  constructor(public itinerarioService: ItinerarioService, public cursoService: CursoService, public route: ActivatedRoute, public router: Router, public authHandler: AuthHandlerService) { }

  ngOnInit(): void {
    const userType = this.authHandler.getLoggedInUserType();
    if (userType !== 'profesor' && userType !== 'alumno') {
      this.router.navigateByUrl('login'); // Redirect to login
    }
    this.getItinerarios();
    this.getCursos();
    this.userType = this.authHandler.getLoggedInUserType();
    this.userId = this.authHandler.getLoggedInUserId();
  }

  getItinerarios() {
    this.itinerarioService.index().subscribe(data =>{
      this.itinerariosList = data;
    });
  }

  getCursos() {
    this.cursoService.index().subscribe(data =>{
      this.cursosList = data;
    });
  }
  
}
