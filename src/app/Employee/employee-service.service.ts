import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, delay, map, of } from 'rxjs';
import { Employee } from './employee';
import { FilterData } from './filter-data';
import axios from 'axios';
import { WebApiUrls } from '../webapi-urls';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrls: WebApiUrls = new WebApiUrls();
  employees: Employee[] = [];
  filterData$: Subject<FilterData>;
  constructor(private http: HttpClient) {
    this.filterData$ = new Subject<FilterData>();
  }
  postEmployeeData(employee: Employee): Observable<boolean> {
    console.log('post method called');
    return this.http.post<boolean>(this.apiUrls.addEmployee, employee);
  }
  getEmployeeData(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrls.getAllEmployees);
  }
  getEmployeesWithRoleNull(name: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      this.apiUrls.getEmployeesWithRolenull + name
    );
  }
  deleteEmployeeData(employeeIds: string[]): Observable<Employee[]> {
    return this.http.delete<Employee[]>(this.apiUrls.deleteEmployees, {
      body: employeeIds,
    });
  }
  updateEmployee(employee: Employee) {
    return this.http.post<boolean>(this.apiUrls.updateEmployee, employee);
  }
  getEmployeeIds(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrls.getAllIds);
  }
  applyFilters(inputFilters: FilterData): Observable<Employee[]> {
    return this.http.post<Employee[]>(
      this.apiUrls.filterEmployees,
      inputFilters
    );
  }
  applySorting(property: string, order: string): Observable<Employee[]> {
    const params = new HttpParams()
      .set('property', property)
      .set('order', order);
    return this.http.get<Employee[]>(this.apiUrls.sorting, { params });
  }
  getEmployeeById(id: string): Observable<Employee> {
    console.log(id);
    return this.http.get<Employee>(this.apiUrls.getEmployeeById + id);
  }
  getEmployeesByRoleId(id: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrls.getEmployeeByRoleId + id);
  }
  checkIfEmployeeIdExists(id:string)
  {
    console.log(id);
    let t;
    return this.getEmployeeIds();
    // this.getEmployeeIds().subscribe((value)=>
    // {
    //   // console.log(value);
    //   //  t = of(value.some((a) => a === id))
    //         //.pipe(delay(2000));
    // });
    //return t
  }

  ngOnDestroy() {
    this.filterData$.unsubscribe();
  }
}
