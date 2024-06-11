import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-dropdown',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-dropdown.component.html',
  styleUrl: './filter-dropdown.component.scss',
})
export class FilterDropdownComponent {
  resetCheckBoxes: boolean = false;
  @Input() filterName: string = '';
  @Input() dropDownData: any;
  @Output() isSelected = new EventEmitter<boolean>();
  SelectedCount: number = 0;
  isDropDownHidden: boolean = true;
  selectedFilterIds: number[] = [];
  selectDropDown() {
    this.isDropDownHidden = this.isDropDownHidden ? false : true;
  }
  checkFilter(Id: number, event: any) {
    if (event.currentTarget.checked == true) {
      this.SelectedCount += 1;
      this.selectedFilterIds.push(Id);
    } else {
      this.SelectedCount -= 1;
      this.selectedFilterIds = this.selectedFilterIds.filter(
        (item) => item != Id
      );
    }
    if (this.SelectedCount > 0) {
      this.isSelected.emit(true);
    } else {
      this.isSelected.emit(false);
    }
  }
  selectedFiltersIdsArray() {
    return this.selectedFilterIds;
  }
  reset() {
    const checkboxes = document.querySelectorAll(
      '.status-check'
    ) as NodeListOf<HTMLInputElement>;
    this.SelectedCount = 0;
    this.isDropDownHidden = true;
    this.selectedFilterIds = [];
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
  }
}
