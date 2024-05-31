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
  alphabet$:Subject<string>; 
  filterData$:Subject<FilterData>;
  constructor(private http:HttpClient ) {
    this.alphabet$ = new Subject<string>();
    this.filterData$=new Subject<FilterData>();
   }

  getEmployeeData():Observable<Employee[]>
  {
    var Employees=this.http.get<Employee[]>(`https://localhost:7262/api/Employee/GetAllEmployees`);
    Employees.subscribe((emp)=>{
      console.log(emp[0].status.id);
    })
    debugger
    return this.http.get<Employee[]>(`https://localhost:7262/api/Employee/GetAllEmployees`);
  }
  getFilteredData(alphabet:string):Observable<Employee[]>
  {
    // var Employees=this.http.get<Employee[]>(`https://localhost:7262/api/Employee/`+alphabet);
    // Employees.subscribe((emp)=>{
    //   this.http.get<Employee[]>(`https://localhost:7262/api/Employee/`+alphabet).pipe(
    //     map((data: any) => {
    //       return data.map((employeeData: any) => {
    //         return {
    //           firstName: employeeData.firstName,
    //           lastName: employeeData.lastName,
    //           id:employeeData.id,
    //           department:employeeData.department,
    //           jobTitle:employeeData.jobTitle,
    //           email:employeeData.email,
    //           location:employeeData.location,
    //           joinDate:employeeData.joinDate,
    //           status: {
    //             id: employeeData.status.id, 
    //             statusName: employeeData.status.statusName,
    //           },
    //         } as Employee; // Cast to Employee interface for type safety
    //       });
    //     })
    //   );
    //   return this.http.get<Employee[]>(`https://localhost:7262/api/Employee/`+alphabet);
    // })
    
    // return this.http.get<Employee[]>(`https://localhost:7262/api/Employee/`+alphabet).pipe(
    //   map((data: any) => {
    //     return data.map((employeeData: any) => {
    //       return {
    //         firstName: employeeData.firstName,
    //         lastName: employeeData.lastName,
    //         id: employeeData.id,
    //         department:employeeData.department,
    //         jobTitle:employeeData.jobTitle,
    //         email:employeeData.email,
    //         location:employeeData.location,
    //         joinDate:employeeData.joinDate,
    //         status: {
    //           id: employeeData.status?.id || null, 
    //           statusName: employeeData.status?.statusName||null,
    //         },
    //       } as Employee; 
    //     });
    //   })
    // );
    return this.http.get<Employee[]>(`https://localhost:7262/api/Employee/`+alphabet);
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
    this.alphabet$.unsubscribe();
  }
}
