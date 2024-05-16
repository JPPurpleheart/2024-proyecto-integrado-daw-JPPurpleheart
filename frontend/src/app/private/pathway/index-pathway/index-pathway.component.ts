import { Component, OnInit } from '@angular/core';
import { ItinerarioService } from 'src/app/core/services/cursos/itinerario.service';
import { CursoService } from 'src/app/core/services/cursos/curso.service';
import { ActivatedRoute } from '@angular/router';
import { AfterLoginService } from 'src/app/core/services/login/after-login.service';

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

  constructor(public itinerarioService: ItinerarioService, public cursoService: CursoService, public route: ActivatedRoute, public afterLoginService: AfterLoginService) { }

  ngOnInit(): void {
    this.getItinerarios();
    this.getCursos();
    this.userType = this.afterLoginService.getLoggedInUserType();
    this.userId = this.afterLoginService.getLoggedInUserId();
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
