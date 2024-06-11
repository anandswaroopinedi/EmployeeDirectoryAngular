import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from './department';
import { HttpClient } from '@angular/common/http';
import { WebApiUrls } from '../webapi-urls';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiUrls: WebApiUrls = new WebApiUrls();
  constructor(private http: HttpClient) {}
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrls.departments);
  }
}
