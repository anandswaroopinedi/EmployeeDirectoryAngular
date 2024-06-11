import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from './role';
import { Observable, Subject } from 'rxjs';
import { WebApiUrls } from '../webapi-urls';
import { FilterData } from '../Employee/filter-data';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrls: WebApiUrls = new WebApiUrls();
  filterData$: Subject<FilterData>;
  constructor(private http: HttpClient) {
    this.filterData$ = new Subject<FilterData>();
  }
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrls.getRoles);
  }
  applyFilters(inputFilters: FilterData): Observable<Role[]> {
    return this.http.post<Role[]>(this.apiUrls.filterRoles, inputFilters);
  }
  rep: any;
  addRole(role: Role, employees: string[]): Observable<string> {
    debugger;
    //const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    let params = new HttpParams();
    params = params.append('employees', employees.join(','));
    return this.http.post<string>(this.apiUrls.postRole, role, {
      params: params,
    });
  }
}
