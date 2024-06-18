import { Injectable } from '@angular/core';
import { TokenHandlerService } from './token-handler.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthHandlerService {

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable(); // Public observable for login state

  private loggedInUserId: number = 0;
  private loggedInUserType: string = "";

  constructor(private tokenHandler: TokenHandlerService) { }

  isLoggedIn() {
    // Consider checking token validity here (using TokenHandlerService)
    return this.loggedInSubject.getValue();
  }

  setLoggedIn(loggedIn: boolean) {
    this.loggedInSubject.next(loggedIn); // Emit event on login/logout
  }

  private username: string = "";

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  setLoggedInUser(id: number, userType: string) {
    this.loggedInUserId = id;
    this.loggedInUserType = userType;
  }

  getLoggedInUserId(): number {
    let result:number = 0;
    const LocalStorageSearch = localStorage.getItem('userId');
    if(LocalStorageSearch) {
      result = JSON.parse(LocalStorageSearch).id;
    } else {
      result = this.loggedInUserId;
    }
    return result;
  }

  getLoggedInUserType(): string {
    let result:string = "";
    const LocalStorageSearch = localStorage.getItem('userId');
    if(LocalStorageSearch) {
      result = JSON.parse(LocalStorageSearch).userType;
    } else {
      result = this.loggedInUserType;
    }
    return result;
  }

  removeLoggedInUser() {
    this.loggedInUserId = 0;
    this.loggedInUserType = "";
  }

  removeLoggedIn() {
    return localStorage.removeItem('userId');
  }

}