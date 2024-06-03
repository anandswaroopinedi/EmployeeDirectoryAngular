import { Component } from '@angular/core';
import { RoleOperationsComponent } from '../role-operations/role-operations.component';
import { RoleInfoComponent } from "../role-info/role-info.component";
@Component({
    selector: 'app-role-body',
    standalone: true,
    templateUrl: './role-body.component.html',
    styleUrl: './role-body.component.scss',
    imports: [RoleOperationsComponent, RoleInfoComponent]
})
export class RoleBodyComponent {

}
