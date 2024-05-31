import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { EmployeeBodyComponent } from "./Employee/employee-body/employee-body.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent, SideBarComponent, EmployeeBodyComponent,CommonModule]
})
export class AppComponent {
shView: boolean=false;
changeSideBarWidth(event: string) {
  this.shView=(event=='None'?false:true);
}
}
