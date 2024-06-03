import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from './role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { 
  }
  getRoles():Observable<Role[]>
  {
    return this.http.get<Role[]>(`https://localhost:7262/api/Role`);
  }
}
