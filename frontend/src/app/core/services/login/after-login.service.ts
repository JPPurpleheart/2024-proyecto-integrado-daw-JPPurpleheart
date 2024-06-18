import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthHandlerService } from './auth-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginGuard implements CanActivate {

  constructor(private authHandler: AuthHandlerService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
      Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authHandler.isLoggedIn()) { // Use service method here
      window.alert('No estás auntenticado para entrar aquí; inicia sesión o registrate.');
      this.router.navigateByUrl('login');
      return false; // Explicitly return false to prevent further processing
    }

    // No further action needed in the guard (success handled elsewhere)
    return true;
  }

}