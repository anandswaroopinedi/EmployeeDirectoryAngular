import { Component, OnInit } from '@angular/core';
import { DepartmentServiceService } from '../Department/department-service.service';
import { LocationService } from '../Location/location.service';
import { Location } from '../Location/location';
import { Department } from '../Department/department';
import { Employee } from '../Employee/employee';
import { EmployeeServiceService } from '../Employee/employee-service.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '../Role/role';
import { Router } from '@angular/router';
import { RoleService } from '../Role/role.service';

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.scss'
})
export class AddRoleComponent implements OnInit {
  isDisplayEmployees:boolean=false;
  departments:Department[]=[];
  locations:Location[]=[];
  employees:Employee[]=[];
  employeesSelected:string[]=[];
  roleForm:FormGroup;
  isSubmitted:boolean=false;
  isSuccesfullyAdded:boolean=false;
  postMessage:string='';
  constructor(private departmentService:DepartmentServiceService,private locationService:LocationService,private employeeService:EmployeeServiceService,private router:Router,private roleService:RoleService)
  {
    this.roleForm=new FormGroup({
      roleName:new FormControl('',[Validators.required]),
      departmentId:new FormControl(null),
      locationId:new FormControl(null),
      description:new FormControl(null)
    });
  }
  ngOnInit()
  {
   
    this.departmentService.getDepartments().subscribe((value)=>{
      this.departments=value;
    });
    this.locationService.getLocations().subscribe((value)=>{
      this.locations=value;
    });
    this.employeeService.getEmployeesWithRoleNull("$").subscribe((value)=>{
      this.employees=value;
    })
  }
  selectEmployees(e:any)
  {
    console.log(e.target.value);
    debugger;
    if(e.target.value==null || e.target.value=='')
    {
      this.employeeService.getEmployeesWithRoleNull("$").subscribe((value)=>{
        this.employees=value;
      })
    }
    else{
      this.employeeService.getEmployeesWithRoleNull(e.target.value).subscribe((value)=>{
        this.employees=value;
      })
    }
  }
  CheckEmployee(id:string,event:any)
  {
    if(event.currentTarget.checked==true)
    {
      this.employeesSelected.push(id)
    }
    else{
      this.employeesSelected=this.employeesSelected.filter(empId=>empId!=id);
    }
  }
  MapFormToRole(roleDetails:any)
  {
    let role:Role={
      id:null,
      name:roleDetails.roleName,
      departmentid:roleDetails.departmentId,
      description:roleDetails.description,
      departmentName:'',
      locationName:'',
      locationId:roleDetails.locationId,
      roleDeptLocId:0
    }
    return role;
  }
  ReturnToRolesPage()
  {
    this.router.navigate(['roles']);
  }
  OnSubmit()
  {
    console.log(this.roleForm.value);
    this.isSubmitted=true;
    debugger;
    if(this.roleForm.valid)
    {
      let role:Role=this.MapFormToRole(this.roleForm.value);
      this.roleService.postRoles(role,this.employeesSelected).subscribe((value)=>{
        debugger;
        setTimeout(()=>{
        this.isSuccesfullyAdded=false;
        this.roleForm.reset();
        Object.keys(this.roleForm.controls).forEach(
            field => {
            this.roleForm.get(field)!.setErrors(null);
            }
          );
        },3000);
        this.isSuccesfullyAdded=true;
        this.postMessage=value;
      })
    }
  }
}
