import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  public loggedIn$ = this.authhandler.loggedIn$; // Subscribe to observable
  public username: string = "";
  public userType: string = "";

  constructor(private authhandler: AuthHandlerService, private tokenhandler: TokenHandlerService, private router: Router, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loggedIn$.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
      this.username = this.authhandler.getUsername();
      this.changeDetectorRef.detectChanges();  // Trigger change detection
    }); // Update state on subscription
    this.userType = this.authhandler.getLoggedInUserType();
    if (this.userType !== 'profesor' && this.userType !== 'alumno') {
      this.router.navigateByUrl('login'); // Redirect to login
    }
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.tokenhandler.remove();
    this.authhandler.removeLoggedIn();
    this.authhandler.setLoggedIn(false); // Use service for login state
    this.router.navigateByUrl('/login');
  }
}
