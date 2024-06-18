import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItinerarioService } from 'src/app/core/services/cursos/itinerario.service';
import { AuthHandlerService } from 'src/app/core/services/login/auth-handler.service';

@Component({
  selector: 'app-store-pathway',
  templateUrl: './store-pathway.component.html',
  styleUrls: ['./store-pathway.component.css']
})
export class StorePathwayComponent implements OnInit {

  form = {
    nombre: ''
  };

  constructor(public itinerarioService: ItinerarioService, private router: Router, public authHandler: AuthHandlerService) { }

  ngOnInit(): void {
    const userType = this.authHandler.getLoggedInUserType();
    if (userType !== 'profesor' && userType !== 'alumno') {
      this.router.navigateByUrl('login'); // Redirect to login
    }
  }

  addPathway() {
    return this.itinerarioService.store(this.form).subscribe(data => {
      this.router.navigateByUrl('/pathway');
    });
  }

}
