import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { EmployeeBodyComponent } from './Employee/employee-body/employee-body.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./login/login.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [

        LoginComponent
    ]
})
export class AppComponent {
}
