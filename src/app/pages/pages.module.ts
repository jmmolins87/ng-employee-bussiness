import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';


@NgModule({
  declarations: [
    AddEditEmployeeComponent,
    ListEmployeeComponent
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    AddEditEmployeeComponent,
    ListEmployeeComponent
  ]
})
export class PagesModule { }
