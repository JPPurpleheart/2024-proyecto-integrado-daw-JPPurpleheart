import { Component, OnInit } from '@angular/core';
import { ItinerarioService } from 'src/app/core/services/cursos/itinerario.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-pathway',
  templateUrl: './edit-pathway.component.html',
  styleUrls: ['./edit-pathway.component.css']
})
export class EditPathwayComponent implements OnInit {

  form = {
    nombre: ''
  };
  itinerariosList:any = {
    id: '',
    nombre: ''
  };
  id_itinerario:number = 0;

  constructor(public itinerarioService: ItinerarioService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id_itinerario = Number(this.route.snapshot.paramMap.get(':id_pathway'));
    this.getItinerario(this.id_itinerario);
  }

  getItinerario(id: any) {
    this.itinerarioService.show(id).subscribe(data => {
      this.itinerariosList.id = data.id;
      this.itinerariosList.nombre = data.nombre;
    });
  }

  submitPathway() {
    return this.itinerarioService.update(this.id_itinerario, this.form).subscribe(data => {
      this.router.navigateByUrl('/pathway/' + this.id_itinerario);
    });
  }

}
