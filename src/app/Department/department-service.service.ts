import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from './department';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {

  constructor(private http:HttpClient) { }
  getDepartments():Observable<Department[]>{
    return this.http.get<Department[]>(`https://localhost:7262/api/Department`);
  }
}
