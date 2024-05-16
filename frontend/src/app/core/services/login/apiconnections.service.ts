import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIConnectionsService {

  constructor(private http: HttpClient) { }

  signup(data: any) {
    return this.http.post('http://localhost:8000/api/signup', data);
  }

  login(data: any) {
    return this.http.post('http://localhost:8000/api/login', data);
  }
}
