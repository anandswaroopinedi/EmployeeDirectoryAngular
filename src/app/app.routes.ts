import { Routes } from '@angular/router';
import { EmployeeBodyComponent } from './Employee/employee-body/employee-body.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { RoleBodyComponent } from './Role/role-body/role-body.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { RoleDetailsComponent } from './role-details/role-details.component';

export const routes: Routes = [
    {
        path:'',component:EmployeeBodyComponent
    }
    ,{
        path:'addemployee',component:AddEmployeeComponent
    }
    ,{
        path:'addemployee/:id',component:AddEmployeeComponent
    }
    ,{
        path:'roles',component:RoleBodyComponent
    }
    ,{
        path:'employees',component:EmployeeBodyComponent
    }
    ,{
        path:'addrole',component:AddRoleComponent
    }
    ,{
        path:'roleDetails/:id',component:RoleDetailsComponent
    }
    // ,{
    //     path:'**',component:EmployeeBodyComponent
    // }
];
