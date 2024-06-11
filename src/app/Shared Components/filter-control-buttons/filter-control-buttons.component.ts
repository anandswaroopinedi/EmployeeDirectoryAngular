import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-control-buttons',
  standalone: true,
  imports: [],
  templateUrl: './filter-control-buttons.component.html',
  styleUrl: './filter-control-buttons.component.scss',
})
export class FilterControlButtonsComponent {
  @Input() isDisplayed: boolean = true;
  @Output() isReset = new EventEmitter<boolean>();
  @Output() isApply = new EventEmitter<boolean>();
  reset() {
    this.isReset.emit(true);
  }
  apply() {
    this.isApply.emit(true);
  }
}
