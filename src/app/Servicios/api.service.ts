import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  private http: HttpClient = inject(HttpClient);

  private baseUrl = "https://mjansen.pythonanywhere.com/api";

  login(user: string):Observable<any>{
    return this.http.get(this.baseUrl+"/users/" + user).pipe(retry(3));
  };

  register(data: any): Observable<any>{
    const headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Origin': '*',  // Permite todas las solicitudes de cualquier origen
    });
    return this.http.post(this.baseUrl+"/users", data).pipe(retry(3));
  };

  listarUsuarios(): Observable<any> {
    return this.http.get(this.baseUrl + '/users').pipe(retry(3));
  };

  eliminarUsuario(id: string): Observable<any>{
    return this.http.delete(this.baseUrl + '/users/' + id).pipe(retry(3));
  };
}
