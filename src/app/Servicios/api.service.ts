import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  private http: HttpClient = inject(HttpClient);

  private baseUrl = "http://localhost:3000";

  login(user: string):Observable<any>{
    return this.http.get(this.baseUrl+"/users?username=" + user).pipe(retry(3));
  };

  register(data: any): Observable<any>{
    return this.http.post(this.baseUrl+"/users", data).pipe(retry(3));
  };

  listarUsuarios(): Observable<any> {
    return this.http.get(this.baseUrl + '/users').pipe(retry(3));
  };

  eliminarUsuario(id: string): Observable<any>{
    return this.http.delete(this.baseUrl + '/users/' + id).pipe(retry(3));
  }
}
