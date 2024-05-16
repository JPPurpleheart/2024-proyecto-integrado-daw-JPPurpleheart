import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthHandlerService } from './auth-handler.service';

@Injectable({
  providedIn: 'root'
})
export class BeforeLoginService implements CanActivate {

  public loggedIn: boolean = false;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    this.authHandler.getAuthStatus().subscribe(
      value => {
        this.loggedIn = value;
      }
    );
    return !this.loggedIn;    
  }

  constructor(private authHandler: AuthHandlerService) { }
}