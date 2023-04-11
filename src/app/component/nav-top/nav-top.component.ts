import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from 'src/app/add-employee/add-employee.component';
@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.scss'],
})
export class NavTopComponent {
  constructor(public dialog: MatDialog) {}

  addEmployeeOpenDialog() {
    this.dialog.open(AddEmployeeComponent);
  }
}
