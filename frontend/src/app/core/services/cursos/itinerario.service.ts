import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItinerarioService {

  private apiURL = "http://127.0.0.1:8000/api/itinerarios/";

  constructor(private http: HttpClient) { }

  index(): Observable < any[] >{
    return this.http.get<any>(this.apiURL);
  }
  
  show(id: any): Observable <any>{
    return this.http.get(this.apiURL+id);
  }

  store(data: any): Observable <any>{
    return this.http.post<any>(this.apiURL+"create", data);
  }

  update(id: any, data: any): Observable <any>{
    return this.http.put(this.apiURL+"update/"+id, data);
  }

}
