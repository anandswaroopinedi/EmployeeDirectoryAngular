import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { 
  }
    postLoginDetails(user:User):Observable<any>
    {
      return this.http.post<any>('https://localhost:7270/api/Login',user);  
    }
}
