import { Routes } from '@angular/router';
import { EmployeeBodyComponent } from './Employee/employee-body/employee-body.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { RoleBodyComponent } from './Role/role-body/role-body.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { RoleDetailsComponent } from './role-details/role-details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { activateGuard } from './Guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canDeactivate:[activateGuard],
  }
//   {
//     path: 'home/addemployee',
//     component: AddEmployeeComponent,
//   },
//   {
//     path: 'home/addemployee/:id',
//     component: AddEmployeeComponent,
//   },
//   {
//     path: 'home/roles',
//     component: RoleBodyComponent,
//   },
//   {
//     path: 'home/employees',
//     component: EmployeeBodyComponent,
//   },
//   {
//     path: 'home/addrole',
//     component: AddRoleComponent,
//   },
//   {
//     path: 'roleDetails/:id',
//     component: RoleDetailsComponent,
//   },
  ,{
    path:'home',
    component:HomeComponent,
    canActivate:[activateGuard],
    children:[
        {path:'',component:EmployeeBodyComponent}
        ,{
            path: 'addemployee',
            component: AddEmployeeComponent,
        }
        ,{
            path: 'roleDetails/:id',
            component: RoleDetailsComponent,
        }
        ,{
            path: 'addrole',
            component: AddRoleComponent,
        }
        ,{
            path: 'roles',
            component: RoleBodyComponent,
        }
        ,{
            path: 'addemployee',
            component: AddEmployeeComponent,
        }
        ,{
            path: 'addemployee/:id',
            component: AddEmployeeComponent,
          }
        ,{
            path:'employees',
            component:EmployeeBodyComponent,
        }
    ]
  }
  ,{
      path:'**',component:LoginComponent,
      canActivate:[activateGuard],
  }
];
