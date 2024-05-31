import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
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
  @Input() filterAlphabet:string='';
  @Input() filterData?:FilterData;
  subscribtion?: Subscription;
  employeeData: Employee[] = [];
  checkAllEmployees:boolean=false;
  checkedEmployeesCount:number=0;
  selectedEmployeesDelete:string[]=[];
  isShowOptionMenu:boolean=false;
  constructor(private employeeService: EmployeeServiceService) {
    this.employeeData = employeeService.employees;
    console.log(this.employeeData);
  }

  ngOnChanges()
  {
    if(this.filterData==undefined || this.checkFiltersApplied())
    {
      debugger
      this.subscribtion=this.employeeService.getFilteredData(this.filterAlphabet).subscribe({
        next: (employees) => {
          this.employeeData = employees;
          console.log(this.employeeData);
        },
        error: (error) => console.error('error', error),
      });
    }
    else
    {
      debugger
      this.employeeService.applyFilters(this.filterData).subscribe({
        next: (employees) => {
          this.employeeData = employees;
        },
        error: (error) => console.error('error', error),
      });
    }
  }
  checkFiltersApplied()
  {
    debugger
    if(this.filterData?.Locations.length||this.filterData?.Departments.length||this.filterData?.Statuses.length)
    {
      return false
    }
    return true
  }
  selectOne(id:string,event:any)
  {
    if(event.currentTarget.checked==true)
      this.checkedEmployeesCount+=1;
    // this.selectedEmployeesDelete.push(id);
    else
    {
      this.checkedEmployeesCount-=1;
      // this.selectedEmployeesDelete=this.selectedEmployeesDelete.filter(employee=> employee!=id)
      const headCheckbox = document.querySelectorAll('.head-check-box')[0] as HTMLInputElement;
      headCheckbox.checked=false
    }
  }
  // changeEmployeeTableView(employeesArr: Employee[]) {
  //   this.employeeData = employeesArr;
  // }
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
    const checkboxes = document.querySelectorAll('.check-box') as NodeListOf<HTMLInputElement>;
    this.employeeService.getEmployeeIds().subscribe((employeeIdsArray)=>{
      const employeeIds:string[]=employeeIdsArray;
      for(let i=0;i<checkboxes.length;i++)
      {
        if(checkboxes[i].checked==true)
        this.selectedEmployeesDelete.push(employeeIds[i])
      }
      console.log(this.selectedEmployeesDelete);
      debugger;
      this.employeeService.deleteEmployeeData(this.selectedEmployeesDelete).subscribe((employees)=>{
        this.employeeData=employees;
      }); 
    });
    
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
  deleteEmployeeUsingEllipsis(index:number)
  {
    const checkboxes = document.querySelectorAll('.check-box') as NodeListOf<HTMLInputElement>;
    checkboxes[index].checked=true;
    this.deleteEmployees();
  }
  ngOnDestroy(): void {
    this.subscribtion?.unsubscribe();
  }
}
