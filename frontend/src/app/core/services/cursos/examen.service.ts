import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  private apiURL = "http://127.0.0.1:8000/api/examenes/";

  constructor(private http: HttpClient) { }

  index(): Observable < any[] >{
    return this.http.get<any>(this.apiURL);
  }

  show(id: any): Observable <any>{
    return this.http.get(this.apiURL+id);
  }

  findQuestionsByCourse(idCurso: number): Observable <any> {
    return this.http.get(this.apiURL + 'findQuestionsByCourse/' + idCurso);
  }

  store(data: any): Observable <any>{
    return this.http.post<any>(this.apiURL+"create", data);
  }

  update(id: any, data: any): Observable <any>{
    console.log(this.apiURL+"update/"+id, data);
    return this.http.put(this.apiURL+"update/"+id, data);
  }

}
