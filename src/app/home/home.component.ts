import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { RouterOutlet } from '@angular/router';
import { EmployeeBodyComponent } from '../Employee/employee-body/employee-body.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    HeaderComponent,
    SideBarComponent,
    RouterOutlet,
    EmployeeBodyComponent,
    CommonModule,
  ],
})
export class HomeComponent {
  shView: boolean = false;
  changeSideBarWidth(event: string) {
    this.shView = event == 'None' ? false : true;
  }
}
