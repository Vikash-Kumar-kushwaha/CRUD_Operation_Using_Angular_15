import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTableDataComponent } from './component/employee-table-data/employee-table-data.component';

const routes: Routes = [
  {
    path: 'employee-table-data',
    component: EmployeeTableDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
