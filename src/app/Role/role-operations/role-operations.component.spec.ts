import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleOperationsComponent } from './role-operations.component';

describe('RoleOperationsComponent', () => {
  let component: RoleOperationsComponent;
  let fixture: ComponentFixture<RoleOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleOperationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
