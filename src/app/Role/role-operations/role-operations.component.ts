import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DepartmentServiceService } from '../../Department/department-service.service';
import { LocationService } from '../../Location/location.service';
import { Department } from '../../Department/department';
import { Location } from '../../Location/location';

@Component({
  selector: 'app-role-operations',
  standalone: true,
  imports: [],
  templateUrl: './role-operations.component.html',
  styleUrl: './role-operations.component.scss'
})
export class RoleOperationsComponent {
reset() {
throw new Error('Method not implemented.');
}
filterByUserInputs() {
throw new Error('Method not implemented.');
}
  isLocationDropDownHidden:boolean=true;
  isDepartmentDropDownHidden:boolean=true;
  departments?:Department[];
  locations?:Location[];
  selectedDepartments:number[]=[];
  selectedLocations:number[]=[];
  deptSubscription?:Subscription;
  locSubscription?:Subscription;
  locationSelectedCount: number=0;
  departmentSelectedCount: number=0;
  resetFilterCheckBoxes:boolean=false;
  constructor(private departmentService:DepartmentServiceService,private locationService:LocationService)
  {
    this.deptSubscription=this.departmentService.getDepartments().subscribe((departmentData)=>
      {
        this.departments=departmentData;
        console.log(this.departments);
      })
    this.locSubscription=this.locationService.getLocations().subscribe((locationData)=>{
      this.locations=locationData;
    })
  }
  checkDepartment(departmentId:number,event:any)
{
  if(event.currentTarget.checked==true)
  {
    this.departmentSelectedCount+=1
    this.selectedDepartments.push(departmentId);
  }
  else
  {
    this.departmentSelectedCount-=1
    this.selectedDepartments=this.selectedDepartments.filter(item=>item!=departmentId)
  }
  console.log(this.selectedDepartments);
}
checkLocation(locationId:number,event:any)
{
  if(event.currentTarget.checked==true)
  {
    this.locationSelectedCount+=1
    this.selectedLocations.push(locationId);
  }
  else
  {
    this.locationSelectedCount-=1
    this.selectedLocations=this.selectedLocations.filter(item=>item!=locationId)
  }
  console.log(this.selectedLocations)
}
selectLocationDropDown()
{
  this.isLocationDropDownHidden=this.isLocationDropDownHidden?false:true;
}
selectDepartmentDropDown()
{
  this.isDepartmentDropDownHidden=this.isDepartmentDropDownHidden?false:true;
}
}
