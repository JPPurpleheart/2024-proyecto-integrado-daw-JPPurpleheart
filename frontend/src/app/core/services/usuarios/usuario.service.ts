import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ProfesorService } from './profesor.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiURL = "http://localhost:8000/api/usuarios/";

  constructor(private http: HttpClient, private profesorService: ProfesorService) { }

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
  
  delete(id: any): Observable <any>{
    return this.http.get(this.apiURL+"delete/"+id);
  }

  findUserIdByUsername(username: string) {
    return this.http.get<any>(`${this.apiURL}findUser/${username}`).pipe(
      switchMap((response) => {
        const id = response.id;
        return this.profesorService.show(id).pipe(
          map((teacher) => {
            const result = { id, userType: 'profesor' };
            console.log(result);
            localStorage.setItem('userId', JSON.stringify(result));
            return result;
          }),
          catchError(() => {
            const result = { id, userType: 'alumno' };
            localStorage.setItem('userId', JSON.stringify(result));
            return of(result);
          })
        );
      })
    );
  }

}
