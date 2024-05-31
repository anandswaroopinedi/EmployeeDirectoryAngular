import { Component,EventEmitter,OnDestroy,OnInit, Output } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeServiceService } from '../employee-service.service';
import {EmployeeInfoComponent} from '../employee-info/employee-info.component'
import { DepartmentServiceService } from '../../Department/department-service.service';
import { Department } from '../../Department/department';
import { Location } from '../../Location/location';
import { Subscription } from 'rxjs';
import { LocationService } from '../../Location/location.service';
import { FilterData } from '../filter-data';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-operations-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './operations-bar.component.html',
  styleUrl: './operations-bar.component.scss'
})
export class OperationsBarComponent implements OnInit,OnDestroy {
[x: string]: any;
  isStatusDropDownHidden:boolean=true;
  isLocationDropDownHidden:boolean=true;
  isDepartmentDropDownHidden:boolean=true;
  filterAlphabet:string="$";
  selectedDepartments:number[]=[];
  selectedStatus:string[]=[];
  selectedLocations:number[]=[];
  departments?:Department[];
  locations?:Location[];
  deptSubscription?:Subscription;
  locSubscription?:Subscription;
  statusSelectedCount: number=0;
  locationSelectedCount: number=0;
  departmentSelectedCount: number=0;
  constructor(private employeeService:EmployeeServiceService,private departmentService:DepartmentServiceService,private locationService:LocationService,private router:Router){}
  ngOnInit(): void {
    this.deptSubscription=this.departmentService.getDepartments().subscribe((departmentData)=>
      {
        this.departments=departmentData;
        console.log(this.departments);
      })
    this.locSubscription=this.locationService.getLocations().subscribe((locationData)=>{
      this.locations=locationData;
    })
  }
getAlphabet(ascii:number) {
  return String.fromCharCode(65+ascii);
  // return 
}
checkStatus(value:string,event:any)
{
  if(event.currentTarget.checked==true)
  {
    this.statusSelectedCount+=1;
    this.selectedStatus.push(value);
  }
  else
  {
    this.statusSelectedCount-=1;
    this.selectedStatus=this.selectedStatus.filter(item=>item!=value)
  }
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
counter(i: number) {
  return new Array(i);
}
selectStatusDropDown()
{
  this.isStatusDropDownHidden=this.isStatusDropDownHidden?false:true;
}
selectLocationDropDown()
{
  this.isLocationDropDownHidden=this.isLocationDropDownHidden?false:true;
}
selectDepartmentDropDown()
{
  this.isDepartmentDropDownHidden=this.isDepartmentDropDownHidden?false:true;
}
 filterDataByAlphabet(index:number) {
  console.log(index);
  const alphabet:string=this.getAlphabet(index);
  console.log(alphabet);
  const selectedVectorEle=document.getElementsByClassName("vector-element")[index] as HTMLElement;
  const style=selectedVectorEle.style;
  console.log(style.backgroundColor);
  if(style.backgroundColor=='rgb(244, 72, 72)')
  {
    style.backgroundColor='#EAEBEE';
    style.color='#818282';
    this.filterAlphabet="$"
  }
  else
  {
    style.backgroundColor='#F44848';
    style.color='white';
    this.filterAlphabet=alphabet;
  }
  this.employeeService.alphabet$.next(this.filterAlphabet);
  this.makeUnSelectBtnDefault(index);
}
makeUnSelectBtnDefault(index:number)
{
  for(let i=0;i<26;i++)
  {
    if(i!=index)
    {
      const selectedVectorEle=document.getElementsByClassName("vector-element")[i] as HTMLElement;
      selectedVectorEle.style.backgroundColor='#EAEBEE';
      selectedVectorEle.style.color='#818282';
    }
  }
}
filterByUserInputs()
{
  var inputFilters:FilterData={
    Alphabet:"",
    Statuses:[],
    Locations:[],
    Departments:[]
  };
  inputFilters.Alphabet=this.filterAlphabet;
  inputFilters.Statuses=this.selectedStatus;
  inputFilters.Departments=this.selectedDepartments;
  inputFilters.Locations=this.selectedLocations;
  this.employeeService.filterData$.next(inputFilters);
}
reset()
{
  this.makeFilterArraysDefault();
  this.employeeService.alphabet$.next(this.filterAlphabet);
  this.filterByUserInputs();
  debugger
}
makeFilterArraysDefault()
{
  this.selectedDepartments=[];
  this.selectedLocations=[];
  this.selectedStatus=[];
  this.departmentSelectedCount=0;
  this.locationSelectedCount=0;
  this.statusSelectedCount=0;
  this.isDepartmentDropDownHidden=true;
  this.isLocationDropDownHidden=true;
  this.isStatusDropDownHidden=true;
  const checkboxes=document.getElementsByClassName("status-check") as HTMLCollectionOf<HTMLInputElement>
  for(let i=0;i<checkboxes.length;i++)
  {
    checkboxes[i].checked=false;
  }
}
ngOnDestroy()
{
  this.deptSubscription?.unsubscribe();
  this.locSubscription?.unsubscribe();
}
}
