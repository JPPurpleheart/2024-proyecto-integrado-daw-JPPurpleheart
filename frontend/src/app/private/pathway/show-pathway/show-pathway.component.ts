import { Component, OnInit } from '@angular/core';
import { ItinerarioService } from 'src/app/core/services/cursos/itinerario.service';
import { CursoService } from 'src/app/core/services/cursos/curso.service';
import { ActivatedRoute } from '@angular/router';
import { AfterLoginService } from 'src/app/core/services/login/after-login.service';

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

  constructor(public itinerarioService: ItinerarioService, public cursoService: CursoService, private route: ActivatedRoute, public afterLoginService: AfterLoginService) { }

  ngOnInit(): void {
    this.id_itinerario = Number(this.route.snapshot.paramMap.get(':id_pathway'));
    this.getItinerarios();
    this.getCursos();
    this.userType = this.afterLoginService.getLoggedInUserType();
    this.userId = this.afterLoginService.getLoggedInUserId();
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

}
