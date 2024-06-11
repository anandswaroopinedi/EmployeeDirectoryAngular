import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Department } from '../Department/department';
import { Role } from '../Role/role';
import { Subject, Subscription } from 'rxjs';
import { DepartmentService } from '../Department/department-service.service';
import { LocationService } from '../Location/location.service';
import { RoleService } from '../Role/role.service';
import { Location } from '../Location/location';
import { Project } from '../Project/project';
import { Employee } from '../Employee/employee';
import { EmployeeService } from '../Employee/employee-service.service';
import { ProjectService } from '../Project/project.service';
import { CommonModule } from '@angular/common';
import { StatusService } from '../status/status.service';
import { Status } from '../status/status';
import { ActivatedRoute, Router } from '@angular/router';
import { duplicateIdValidator } from '../custom-validators';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent implements OnInit {
  @ViewChild('imgInput') imageInput!: ElementRef;
  Operation: string = 'Add Employee';
  profileImg: string = 'assets/profile.png';
  isImageuploaded: boolean = false;
  isSubmitted: boolean = false;
  employeeForm: FormGroup;
  deptSubscription?: Subscription;
  locSubscription?: Subscription;
  roleSubscription?: Subscription;
  projectSubscription?: Subscription;
  emoployeeSubscription?: Subscription;
  statusSubscription?: Subscription;
  locations: Location[] = [];
  departments: Department[] = [];
  roles: Role[] = [];
  projects: Project[] = [];
  managers: Employee[] = [];
  statuses: Status[] = [];
  isSuccesfullyAdded: boolean = false;
  imageString: string = '';
  edit: boolean = false;
  // private imageString$:Subject<string>=new Subject<string>();
  constructor(
    public departmentService: DepartmentService,
    public locationService: LocationService,
    public roleService: RoleService,
    public employeeService: EmployeeService,
    private projectService: ProjectService,
    private statusService: StatusService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.employeeForm = new FormGroup({
      profileImage: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z '-]{0,39})?$/),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z '-]{0,39})?$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      id: new FormControl('', 
      [
        Validators.required,
        Validators.pattern(/^TZ\d{4}$/),
        duplicateIdValidator(employeeService),
      ]),
      departmentId: new FormControl(null),
      dateOfBirth: new FormControl(),
      mobileNo: new FormControl(null, Validators.pattern(/^\d{10}$/)),
      joinDate: new FormControl('', [Validators.required]),
      locationId: new FormControl(null),
      jobTitleId: new FormControl(null),
      managerId: new FormControl(),
      projectId: new FormControl(null, [Validators.required]),
      statusId: new FormControl(null, [Validators.required]),
    });
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const id: string = params['id'];
      console.log(id);
      if (id != undefined && id.length == 6) {
        this.employeeService
          .getEmployeeById(id)
          .subscribe((employee: Employee) => {
            console.log(employee);
            this.employeeForm.patchValue({
              id: employee.id,
              firstName: employee.firstName,
              lastName: employee.lastName,
              email: employee.email,
              departmentId: employee.departmentId,
              dateOfBirth: employee.dateOfBirth,
              locationId: employee.locationId,
              projectId: employee.projectId,
              statusId: employee.statusId,
              managerId: employee.managerId,
              jobTitleId: employee.jobTitleId,
              joinDate: employee.joinDate,
              mobileNo: employee.mobileNo,
            });
            console.log(this.employeeForm.value);
            this.edit = true;
            this.imageString = employee.profileImage;
            this.profileImg = employee.profileImage;
            this.isImageuploaded = true;
            this.Operation = 'Edit Employee';
          });
        this.employeeForm.get('id')?.disable();
        const profileImageControl = this.employeeForm.get(
          'profileImage'
        ) as FormControl;
        if (profileImageControl) {
          profileImageControl.clearValidators();
          profileImageControl.updateValueAndValidity({ onlySelf: true });
        }
      }
    });
    this.deptSubscription = this.departmentService
      .getDepartments()
      .subscribe((departmentData) => {
        this.departments = departmentData;
        console.log(this.departments);
      });
    this.locSubscription = this.locationService
      .getLocations()
      .subscribe((locationData) => {
        this.locations = locationData;
      });
    this.roleSubscription = this.roleService.getRoles().subscribe((value) => {
      this.roles = value;
    });
    this.projectSubscription = this.projectService
      .getProjects()
      .subscribe((value) => {
        this.projects = value;
      });
    this.statusSubscription = this.statusService
      .getStatuses()
      .subscribe((value) => {
        this.statuses = value;
      });
    this.emoployeeSubscription = this.employeeService
      .getEmployeeData()
      .subscribe((value) => {
        this.managers = value;
      });
  }
  inputImage() {
    this.imageInput.nativeElement.click();
  }
  checkImage(event: any) {
    console.log(this.profileImg);
    const reader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.profileImg = reader.result as string;
        console.log(this.profileImg);
        this.isImageuploaded = true;
        this.assignImage(reader.result as string);
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
      console.log(this.profileImg);
      console.log(this.imageString);
    }
  }
  assignImage(image: string) {
    this.imageString = image;
    console.log('Image String:' + this.imageString);
  }
  checkProfileImage() {
    if (this.imageInput == undefined) {
      return false;
    }
    return true;
  }
  onSubmit() {
    console.log(duplicateIdValidator(this.employeeService));
    console.log(this.employeeForm.get('id'));
    this.isSubmitted = true;
    if (this.employeeForm.valid) {
      console.log('sent data');
      console.log(this.employeeForm.value);
      let emp = this.mapToEmployee(this.employeeForm.getRawValue());
      if (this.edit) {
        this.employeeService.updateEmployee(emp).subscribe((value) => {
          if (value == true) {
            setTimeout(() => {
              this.isSuccesfullyAdded = false;
              setTimeout(() => {
                this.router.navigate(['addemployee/']);
              }, 1000);
            }, 3000);
            this.isSuccesfullyAdded = true;
          }
        });
      } else {
        this.employeeService.postEmployeeData(emp).subscribe((value) => {
          if (value == true) {
            setTimeout(() => {
              this.isSuccesfullyAdded = false;
              this.profileImg = 'assets/profile.png';
              this.isImageuploaded = false;
              this.employeeForm.reset();
              Object.keys(this.employeeForm.controls).forEach((field) => {
                this.employeeForm.get(field)!.setErrors(null);
              });
            }, 3000);
            this.isSuccesfullyAdded = true;
          }
        });
      }
    }
  }
  mapToEmployee(empDetails: any) {
    console.log(empDetails);
    let e: Employee = {
      id: empDetails.id,
      profileImage: this.imageString,
      firstName: empDetails.firstName,
      lastName: empDetails.lastName,
      email: empDetails.email,
      departmentId: empDetails.departmentId,
      departmentName: '',
      locationId: empDetails.locationId,
      locationName: '',
      jobTitleId: empDetails.jobTitleId,
      jobTitleName: '',
      joinDate: empDetails.joinDate,
      statusId: empDetails.statusId,
      statusName: '',
      managerId: empDetails.managerId,
      projectId: empDetails.projectId,
      dateOfBirth: empDetails.dateOfBirth,
      mobileNo: empDetails.mobileNo,
    };
    return e;
  }
  onCancel() {
    this.router.navigate(['/home']);
  }
  ngOnDestroy() {
    this.deptSubscription?.unsubscribe();
    this.emoployeeSubscription?.unsubscribe();
    this.projectSubscription?.unsubscribe();
    this.locSubscription?.unsubscribe();
    this.roleSubscription?.unsubscribe();
  }
}
