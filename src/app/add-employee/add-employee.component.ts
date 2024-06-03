import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Department } from '../Department/department';
import { Role } from '../Role/role';
import { Subscription } from 'rxjs';
import { DepartmentServiceService } from '../Department/department-service.service';
import { LocationService } from '../Location/location.service';
import { RoleService } from '../Role/role.service';
import { Location } from '../Location/location';
import { Project } from '../Project/project';
import { Employee } from '../Employee/employee';
import { EmployeeServiceService } from '../Employee/employee-service.service';
import { ProjectService } from '../Project/project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit {
  @ViewChild('imgInput') imageInput!:ElementRef;
  profileImg:string="assets/profile.png";
  isImageuploaded:boolean=false;
  isSubmitted:boolean=false;
  employeeForm:FormGroup;
  deptSubscription?:Subscription;
  locSubscription?:Subscription;
  roleSubscription?:Subscription;
  projectSubscription?:Subscription;
  emoployeeSubscription?:Subscription;
  locations:Location[]=[];
  departments:Department[]=[];
  roles:Role[]=[];
  projects:Project[]=[];
  managers:Employee[]=[];
  constructor(public departmentService:DepartmentServiceService,public locationService:LocationService,public roleService:RoleService,public employeeService:EmployeeServiceService,private projectService:ProjectService)
  {
    this.employeeForm = new FormGroup({
      profileImage:new FormControl('',[Validators.required]),
      firstName: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z '-]{0,39})?$/)]),
      lastName: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z '-]{0,39})?$/)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      id: new FormControl('',[Validators.required,Validators.pattern(/^TZ\d{4}$/)]),
      department: new FormControl('',[Validators.required]),
      dateOfBirth: new FormControl(''),
      mobileNo: new FormControl('',Validators.pattern(/^\d{10}$/)),
      joiningDate: new FormControl('',[Validators.required]),
      location: new FormControl('',[Validators.required]),
      role: new FormControl('',[Validators.required]),
      manager: new FormControl(''),
      project: new FormControl('',[Validators.required])
    });
  }
  ngOnInit()
  {
    this.deptSubscription=this.departmentService.getDepartments().subscribe((departmentData)=>
      {
        this.departments=departmentData;
        console.log(this.departments);
      })
    this.locSubscription=this.locationService.getLocations().subscribe((locationData)=>{
      this.locations=locationData;
    })
    this.roleSubscription=this.roleService.getRoles().subscribe((value)=>
    {
      this.roles=value;
    })
    this.projectSubscription=this.projectService.getProjects().subscribe((value)=>{
      this.projects=value;
    })
    this.emoployeeSubscription=this.employeeService.getEmployeeData().subscribe((value)=>{
      this.managers=value;
    })
  }
  inputImage()
  {
    this.imageInput.nativeElement.click();
  }
  checkImage(event:any)
  {

    const fileCrctName = "assets/" + event.currentTarget.value.split('\\').pop();
    if(fileCrctName)
    {
      this.employeeForm.value['profileImage']=fileCrctName;
      this.profileImg=this.employeeForm.value['profileImage'];
      this.isImageuploaded=true;
    }
  }
  checkProfileImage()
  {
    if(this.imageInput==undefined)
    {
      return false;
    }
    return true;
  }
  onSubmit() {
    this.isSubmitted=true;
    if(this.employeeForm.valid)
    {
      console.log(this.employeeForm.value);
    }
    }
  onCancel()
  {
    this.employeeForm.reset();
    this.profileImg="assets/profile.png";
    this.isImageuploaded=false;
    console.log(this.employeeForm.value);
  }
  ngOnDestroy()
  {
    this.deptSubscription?.unsubscribe();
    this.emoployeeSubscription?.unsubscribe();
    this.projectSubscription?.unsubscribe();
    this.locSubscription?.unsubscribe();
    this.roleSubscription?.unsubscribe();
  }
}
