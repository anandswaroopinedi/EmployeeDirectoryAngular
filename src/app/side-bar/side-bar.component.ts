import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  @Output() dispShview = new EventEmitter<string>(false);
  shortView: string = 'None';
  expandNavBar() {
    this.shortView = this.shortView == 'block' ? 'None' : 'block';
    this.dispShview.emit(this.shortView);
  }
}
