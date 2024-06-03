import { Component } from '@angular/core';
import { Role } from '../role';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-role-info',
  standalone: true,
  imports: [],
  templateUrl: './role-info.component.html',
  styleUrl: './role-info.component.scss'
})
export class RoleInfoComponent {
  roles:Role[]=[]
  constructor(private roleService:RoleService)
  {
    roleService.getRoles().subscribe((value)=>{
      this.roles=value;
    })
  }
}
