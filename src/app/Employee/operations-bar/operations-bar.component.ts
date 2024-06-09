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
import { FilterDropdownComponent } from "../../Shared Components/filter-dropdown/filter-dropdown.component";
import { FilterControlButtonsComponent } from "../../Shared Components/filter-control-buttons/filter-control-buttons.component";
@Component({
    selector: 'app-operations-bar',
    standalone: true,
    templateUrl: './operations-bar.component.html',
    styleUrl: './operations-bar.component.scss',
    imports: [RouterLink, FilterDropdownComponent, FilterControlButtonsComponent]
})
export class OperationsBarComponent implements OnInit,OnDestroy {
  @ViewChild('locationFilter') locationFilter?: FilterDropdownComponent;
  @ViewChild('departmentFilter') departmentFilter?: FilterDropdownComponent;
  @ViewChild('statusFilter') statusFilter?: FilterDropdownComponent;
  @Output() export=new EventEmitter<boolean>();
  departments?:Department[];
  locations?:Location[];
  statuses?:Status[];
  deptSubscription?:Subscription;
  locSubscription?:Subscription;
  filter1:string='Status';
  filter2:string='Location';
  filter3:string='Department';
  isLocFilterOptionsSelected:boolean=false;
  isDeptFilterOptionsSelected:boolean=false;
  isStatusFilterOptionsSelected:boolean=false;
  filterAlphabet:string="$";
  statusSubscription?:Subscription;
  resetFilterCheckBoxes:boolean=false;
  @ViewChild('buttonsRef') alphabetButtonRef?: ElementRef;
  @ViewChild('filterCheckBoxes') filterCheckBoxes?: ElementRef;
  constructor(private employeeService:EmployeeServiceService,private departmentService:DepartmentServiceService,private locationService:LocationService,private statusService:StatusService,private router:Router){}
  ngOnInit(): void {
    this.statusSubscription=this.statusService.getStatuses().subscribe((value)=>{
      this.statuses=value;
      console.log(this.statuses);
      console.log(this.statuses[0].name);
    });
    this.deptSubscription=this.departmentService.getDepartments().subscribe((departmentData)=>
      {
        this.departments=departmentData;
        console.log(this.departments);
      });
    this.locSubscription=this.locationService.getLocations().subscribe((locationData)=>{
      this.locations=locationData;
    })
  }
getAlphabet(ascii:number) {
  return String.fromCharCode(65+ascii);
  // return 
}
StatusFilterApplied(isSelected:boolean)
  {
    if(isSelected)
    {
      this.isStatusFilterOptionsSelected=true;
    }
    else
    {
      this.isStatusFilterOptionsSelected=false;
    }
  }
LocationFilterApplied(isSelected:boolean)
  {
    if(isSelected)
    {
      this.isLocFilterOptionsSelected=true;
    }
    else
    {
      this.isLocFilterOptionsSelected=false;
    }
  }
  DepartmentFilterApplied(isSelected:boolean)
  {
    if(isSelected)
    {
      this.isDeptFilterOptionsSelected=true;
    }
    else
    {
      this.isDeptFilterOptionsSelected=false;
    }
  }
  
counter(i: number) {
  return new Array(i);
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
  this.filterApply(true)
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
    }
  }
}
filterApply(isApplied:boolean)
  {
    
    if(isApplied)
    {
      var inputFilters:FilterData=new FilterData();
      inputFilters.Locations=this.locationFilter!.selectedFiltersIdsArray();
      inputFilters.Departments=this.departmentFilter!.selectedFiltersIdsArray();
      inputFilters.Alphabet=this.filterAlphabet;
      inputFilters.Statuses=this.statusFilter!.selectedFiltersIdsArray();
      console.log(inputFilters)
      debugger;
      this.employeeService.filterData$.next(inputFilters);
    }
  }
  filterReset(isReset:boolean)
  { 
    var inputFilters:FilterData=new FilterData();
    inputFilters.Alphabet=this.filterAlphabet;
    this.locationFilter!.reset();
    this.departmentFilter!.reset();
    this.statusFilter!.reset();
    this.employeeService.filterData$.next(inputFilters);
  }
  ExportData()
  {
    this.export.emit(true);
  }
// makeFilterArraysDefault()
// {
//   this.selectedDepartments=[];
//   this.selectedLocations=[];
//   this.selectedStatus=[];
//   this.departmentSelectedCount=0;
//   this.locationSelectedCount=0;
//   this.statusSelectedCount=0;
//   this.isDepartmentDropDownHidden=true;
//   this.isLocationDropDownHidden=true;
//   this.isStatusDropDownHidden=true;
//   //const selectedCheckBoxes=this.filterCheckBoxes?.nativeElement.querySelectorAll('div.input.');
//   const checkboxes=document.getElementsByClassName("status-check") as HTMLCollectionOf<HTMLInputElement>
//   for(let i=0;i<checkboxes.length;i++)
//   {
//     checkboxes[i].checked=false;
//   }
// }
ngOnDestroy()
{
  this.deptSubscription?.unsubscribe();
  this.locSubscription?.unsubscribe();
  this.statusSubscription?.unsubscribe();
}
}
