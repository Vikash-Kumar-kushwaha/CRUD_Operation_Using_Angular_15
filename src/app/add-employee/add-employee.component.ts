import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  isSubmitted = false;
  empForm: FormGroup;
  educationLevel = ['Diploma', 'Intermediate', 'Graduate', 'Post Graduate'];

  constructor(
    private _formbuilder: FormBuilder,
    private _empService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<AddEmployeeComponent>
  ) {
    this.empForm = this._formbuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dob: new FormControl('', [Validators.required]),
      gender: new FormControl('male', [Validators.required]),
      education: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      experience: new FormControl('', [Validators.required]),
      package: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .UpdateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('employee Updated', 'Done');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar(
              'employee added successfully',
              'Done'
            );
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
    }
  }
}
