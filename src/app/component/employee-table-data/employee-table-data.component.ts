import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from 'src/app/add-employee/add-employee.component';
import { CoreService } from 'src/app/core/core.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-employee-table-data',
  templateUrl: './employee-table-data.component.html',
  styleUrls: ['./employee-table-data.component.scss'],
})
export class EmployeeTableDataComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _empService: EmployeeService,
    public _dialog: MatDialog,
    private _coreService: CoreService
  ) {}
  ngOnInit(): void {
    this.getEmployeeData();
  }

  getEmployeeData() {
    this._empService.getEmployeeData().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployeeData(id: number) {
    const dialogRef = this._dialog.open(DialogBoxComponent, {
      data: {
        message: 'Are you sure you want to delete this data',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // Call the delete function here with the given id
        // this.deleteItem(id);
        this._empService.deleteEmployeeData(id).subscribe({
          next: (res) => {
            this._coreService.openSnackBar('Deleted Succesfully', 'Done');
            this.getEmployeeData();
          },
          error: console.log,
        });
      }
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEmployeeComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeData();
        }
      },
    });
  }
}
