import { Component, OnInit, OnDestroy, Input, OnChanges, viewChild, ElementRef, ViewChild } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { Employee } from '../employee';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FilterData } from '../filter-data';

@Component({
  selector: 'app-employee-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-info.component.html',
  styleUrl: './employee-info.component.scss',
})
export class EmployeeInfoComponent implements OnChanges,OnDestroy {
  @Input() filterData?:FilterData;
  subscribtion?: Subscription;
  employeeData: Employee[] = [];
  checkAllEmployees:boolean=false;
  checkedEmployeesCount:number=0;
  selectedEmployeesDelete:string[]=[];
  isShowOptionMenu:boolean=false;
  @ViewChild('headCheckBoxChecked') headCheckBoxCheckedRef?:ElementRef;
  isheadCheckBoxChecked: boolean=false;
  constructor(private employeeService: EmployeeServiceService) {
    
  }
  ngOnInit()
  {
    this.employeeService.getEmployeeData().subscribe((employees)=>{
      this.employeeData = employees;
    });
    console.log(this.employeeData);
  }
  ngOnChanges()
  {
    if(this.filterData!=undefined)
      this.employeeService.applyFilters(this.filterData).subscribe({
        next: (employees) => {
          this.employeeData = employees;
        },
        error: (error) => console.error('error', error),
      });
  }
  checkFiltersApplied()
  {
    if(this.filterData?.Locations.length||this.filterData?.Departments.length||this.filterData?.Statuses.length)
    {
      return false
    }
    return true
  }
  selectOne(id:string,event:any)
  {
    if(event.currentTarget.checked==true)
    {
      this.checkedEmployeesCount+=1;
      this.selectedEmployeesDelete.push(id);
    }
    else
    {
      this.checkedEmployeesCount-=1;
      this.selectedEmployeesDelete=this.selectedEmployeesDelete.filter(empId=>empId!=id);
      if (this.headCheckBoxCheckedRef) {
        this.headCheckBoxCheckedRef.nativeElement.currentTarget.style.checked = false;
      }  
    }
  }
  selectAll()
  {
    this.checkAllEmployees=!this.checkAllEmployees;
    const checkboxes = document.querySelectorAll('.check-box') as NodeListOf<HTMLInputElement>;
    for(let i=0;i<checkboxes.length;i++)
    {
      checkboxes[i].checked=this.checkAllEmployees;
      if(this.checkAllEmployees==true)
        this.checkedEmployeesCount+=1
      else
        this.checkedEmployeesCount-=1
    }
    checkboxes.forEach(checkbox => checkbox.checked = this.checkAllEmployees);

  }
  deleteEmployees()
  {
    // const checkboxes = document.querySelectorAll('.check-box') as NodeListOf<HTMLInputElement>;
    // this.employeeService.getEmployeeIds().subscribe((employeeIdsArray)=>{
    //   const employeeIds:string[]=employeeIdsArray;
    //   for(let i=0;i<checkboxes.length;i++)
    //   {
    //     if(checkboxes[i].checked==true)
    //     this.selectedEmployeesDelete.push(employeeIds[i])
    //   }
    //   console.log(this.selectedEmployeesDelete);
      this.employeeService.deleteEmployeeData(this.selectedEmployeesDelete).subscribe((employees)=>{
        this.employeeData=employees;
      }); 
    // });
    
  }
  sortTable(properety:string,order:string)
  {
    this.employeeService.applySorting(properety,order).subscribe((employees)=>{
      this.employeeData=employees;
    })
  }
  showMenuOptions(index:number)
  {
    const ellipsisRef=document.getElementsByClassName('menu-options')[index] as HTMLInputElement;
    ellipsisRef.style.display=ellipsisRef.style.display=="block"?"None":"block";
  }
  deleteEmployeeUsingEllipsis(id:string)
  {
    var arr:string[]=[];
    arr.push(id)
    this.employeeService.deleteEmployeeData(arr).subscribe((employees)=>{
      this.employeeData=employees;
    }); 
  }
  ngOnDestroy(): void {
    this.subscribtion?.unsubscribe();
  }
}
