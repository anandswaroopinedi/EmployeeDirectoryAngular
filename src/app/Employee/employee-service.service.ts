import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Employee } from './employee';
import { FilterData } from './filter-data';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  employees:Employee[]=[];
  filterData$:Subject<FilterData>;
  constructor(private http:HttpClient ) {
    this.filterData$=new Subject<FilterData>();
   }

  getEmployeeData():Observable<Employee[]>
  {
    var Employees=this.http.get<Employee[]>(`https://localhost:7262/api/Employee/GetAllEmployees`);
    Employees.subscribe((emp)=>{
      console.log(emp[0].status.id);
    })
    
    return this.http.get<Employee[]>(`https://localhost:7262/api/Employee/GetAllEmployees`);
  }
  deleteEmployeeData(employeeIds:string[]):Observable<Employee[]>
  {
    return this.http.delete<Employee[]>(`https://localhost:7262/api/Employee/DeleteEmployees`,{body:employeeIds});
  }
  getEmployeeIds():Observable<string[]>
  {
    return this.http.get<string[]>(`https://localhost:7262/api/Employee/GetAllIds`);
  }
  applyFilters(inputFilters:FilterData):Observable<Employee[]>
  {
    return this.http.post<Employee[]>(`https://localhost:7262/api/Employee/FilterEmployees`,inputFilters);
  }
  applySorting(property: string, order: string): Observable<Employee[]> {
    const params = new HttpParams()
      .set('property', property)
      .set('order', order);
    return this.http.get<Employee[]>('https://localhost:7262/api/Employee/Sorting', { params });
  }
  ngOnDestroy()
  {
    this.filterData$.unsubscribe();
  }
}
