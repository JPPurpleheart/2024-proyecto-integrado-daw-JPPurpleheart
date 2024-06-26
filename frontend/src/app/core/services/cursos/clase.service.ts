import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  private apiURL = "http://127.0.0.1:8000/api/clases";

  constructor(private http: HttpClient) { }

  index(): Observable < any[] >{
    return this.http.get<any>(this.apiURL);
  }

  show(id: any): Observable <any>{
    return this.http.get(this.apiURL+'/'+id);
  }

  findByCourse(idCurso: any, id: any): Observable <any>{
    return this.http.get(this.apiURL+'/findByCourse/'+idCurso+'/'+id);
  }

  findClassesByCourse(idCurso: number): Observable <any> {
    return this.http.get(this.apiURL + '/findClassesByCourse/' + idCurso);
  }

  store(data: any): Observable <any>{
    return this.http.post<any>(this.apiURL+"/create", data);
  }

  update(id: any, data: any): Observable <any>{
    return this.http.put(this.apiURL+"/update/"+id, data);
  }
  
}
