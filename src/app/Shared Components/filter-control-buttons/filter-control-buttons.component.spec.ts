import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterControlButtonsComponent } from './filter-control-buttons.component';

describe('FilterControlButtonsComponent', () => {
  let component: FilterControlButtonsComponent;
  let fixture: ComponentFixture<FilterControlButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterControlButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterControlButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
