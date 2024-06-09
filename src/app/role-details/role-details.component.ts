import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../Employee/employee-service.service';
import { Employee } from '../Employee/employee';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-role-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './role-details.component.html',
  styleUrl: './role-details.component.scss'
})
export class RoleDetailsComponent implements OnInit {
  employees:Employee[]=[];
  constructor(private employeeService:EmployeeServiceService,private activatedRoute:ActivatedRoute)
  {

  }
  ngOnInit()
  {
    this.activatedRoute.params.subscribe(params => { 
      const id:number=params['id'];
      console.log(id);
      if(id!=undefined && id>0)
      {
        this.employeeService.getEmployeesByRoleId(id).subscribe((value=>{
          this.employees=value;
        }));
      }
    });
  }
}
