import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';


@NgModule({
  declarations: [
    AddEditEmployeeComponent,
    ListEmployeeComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ], 
  exports: [
    AddEditEmployeeComponent,
    ListEmployeeComponent
  ]
})
export class PagesModule { }
