import { Routes } from '@angular/router';
import { EmployeeBodyComponent } from './Employee/employee-body/employee-body.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

export const routes: Routes = [
    {
        path:'',component:EmployeeBodyComponent
    }
    ,{
        path:'addemployee',component:AddEmployeeComponent
    }
    // ,{
    //     path:'**',component:EmployeeBodyComponent
    // }
];
