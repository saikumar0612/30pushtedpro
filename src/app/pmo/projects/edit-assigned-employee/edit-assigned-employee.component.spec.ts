import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssignedEmployeeComponent } from './edit-assigned-employee.component';

describe('EditAssignedEmployeeComponent', () => {
  let component: EditAssignedEmployeeComponent;
  let fixture: ComponentFixture<EditAssignedEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAssignedEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssignedEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
