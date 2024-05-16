import { Injectable } from '@angular/core';
import { TokenHandlerService } from './token-handler.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthHandlerService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.tokenHandler.isValid());
  
  getAuthStatus(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  constructor(private tokenHandler: TokenHandlerService) { }

  setAuthStatus(value: boolean): void {
    this.loggedIn.next(value);
  }

  private username: string = "";

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

}