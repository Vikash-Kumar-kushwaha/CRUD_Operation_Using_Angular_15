import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTableDataComponent } from './employee-table-data.component';

describe('EmployeeTableDataComponent', () => {
  let component: EmployeeTableDataComponent;
  let fixture: ComponentFixture<EmployeeTableDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTableDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeTableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
