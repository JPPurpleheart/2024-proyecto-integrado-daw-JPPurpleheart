import { Component, OnInit } from '@angular/core';
import { AuthHandlerService } from 'src/app/core/services/login/auth-handler.service';
import { TokenHandlerService } from 'src/app/core/services/login/token-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn: boolean = false;
  public username: string = "";

  constructor(private authhandler: AuthHandlerService, private tokenhandler: TokenHandlerService, private router: Router) { }

  ngOnInit(): void {
    this.authhandler.getAuthStatus().subscribe(
      value => {
        this.username = this.authhandler.getUsername();
        this.loggedIn = value;
      }
    );
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.tokenhandler.remove();
    this.authhandler.setAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

}
