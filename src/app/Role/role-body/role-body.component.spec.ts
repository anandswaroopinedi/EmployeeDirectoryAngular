import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleBodyComponent } from './role-body.component';

describe('RoleBodyComponent', () => {
  let component: RoleBodyComponent;
  let fixture: ComponentFixture<RoleBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
