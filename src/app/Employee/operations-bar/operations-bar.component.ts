import { Component,ElementRef,EventEmitter,OnDestroy,OnInit, Output, ViewChild } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { DepartmentServiceService } from '../../Department/department-service.service';
import { Department } from '../../Department/department';
import { Location } from '../../Location/location';
import { Subscription } from 'rxjs';
import { LocationService } from '../../Location/location.service';
import { FilterData } from '../filter-data';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Status } from '../../status/status';
import { StatusService } from '../../status/status.service';
@Component({
  selector: 'app-operations-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './operations-bar.component.html',
  styleUrl: './operations-bar.component.scss'
})
export class OperationsBarComponent implements OnInit,OnDestroy {

  isStatusDropDownHidden:boolean=true;
  isLocationDropDownHidden:boolean=true;
  isDepartmentDropDownHidden:boolean=true;
  filterAlphabet:string="$";
  selectedDepartments:number[]=[];
  selectedStatus:number[]=[];
  selectedLocations:number[]=[];
  departments?:Department[];
  locations?:Location[];
  statuses?:Status[];
  deptSubscription?:Subscription;
  locSubscription?:Subscription;
  statusSubscription?:Subscription;
  statusSelectedCount: number=0;
  locationSelectedCount: number=0;
  departmentSelectedCount: number=0;
  resetFilterCheckBoxes:boolean=false;
  @ViewChild('buttonsRef') alphabetButtonRef?: ElementRef;
  @ViewChild('filterCheckBoxes') filterCheckBoxes?: ElementRef;
  constructor(private employeeService:EmployeeServiceService,private departmentService:DepartmentServiceService,private locationService:LocationService,private statusService:StatusService,private router:Router){}
  ngOnInit(): void {
    this.deptSubscription=this.departmentService.getDepartments().subscribe((departmentData)=>
      {
        this.departments=departmentData;
        console.log(this.departments);
      })
    this.locSubscription=this.locationService.getLocations().subscribe((locationData)=>{
      this.locations=locationData;
    })
    this.statusSubscription=this.statusService.getStatuses().subscribe((value)=>{
      this.statuses=value;
    })
  }
getAlphabet(ascii:number) {
  return String.fromCharCode(65+ascii);
  // return 
}
checkStatus(value:number,event:any)
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
 filterDataByAlphabet(index:number,event:any) {
  console.log(index);
  const alphabet:string=this.getAlphabet(index);
  console.log(alphabet);
  const style=event.currentTarget.style;
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
  //this.employeeService.alphabet$.next(this.filterAlphabet);
  this.filterByUserInputs()
  this.makeUnSelectBtnDefault(index);
}
makeUnSelectBtnDefault(index:number)
{
  const selectedVectorEle=this.alphabetButtonRef?.nativeElement.querySelectorAll('button.vector-element');
  for(let i=0;i<26;i++)
  {
    if(i!=index)
    {
      selectedVectorEle[i].style.backgroundColor='#EAEBEE';
      selectedVectorEle[i].style.color='#818282';
      debugger
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
  this.filterByUserInputs();
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
  //const selectedCheckBoxes=this.filterCheckBoxes?.nativeElement.querySelectorAll('div.input.');
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
  this.statusSubscription?.unsubscribe();
}
}
