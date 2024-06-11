import { Component } from '@angular/core';
import { RoleOperationsComponent } from '../role-operations/role-operations.component';
import { RoleInfoComponent } from '../role-info/role-info.component';
import { RoleService } from '../role.service';
import { FilterData } from '../../Employee/filter-data';
@Component({
  selector: 'app-role-body',
  standalone: true,
  templateUrl: './role-body.component.html',
  styleUrl: './role-body.component.scss',
  imports: [RoleOperationsComponent, RoleInfoComponent],
})
export class RoleBodyComponent {
  filterData?: FilterData;
  constructor(private roleService: RoleService) {}
  ngDoCheck() {
    this.roleService.filterData$.subscribe((value) => {
      this.filterData = value;
    });
  }
}
