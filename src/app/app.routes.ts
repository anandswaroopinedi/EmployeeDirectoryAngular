import { Routes } from '@angular/router';
import { EmployeeBodyComponent } from './Employee/employee-body/employee-body.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { RoleBodyComponent } from './Role/role-body/role-body.component';

export const routes: Routes = [
    {
        path:'',component:EmployeeBodyComponent
    }
    ,{
        path:'addemployee',component:AddEmployeeComponent
    }
    ,{
        path:'roles',component:RoleBodyComponent
    }
    ,{
        path:'employees',component:EmployeeBodyComponent
    }
    // ,{
    //     path:'**',component:EmployeeBodyComponent
    // }
];
