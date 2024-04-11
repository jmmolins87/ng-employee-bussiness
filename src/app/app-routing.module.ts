import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListEmployeeComponent } from './pages/list-employee/list-employee.component';
import { AddEditEmployeeComponent } from './pages/add-edit-employee/add-edit-employee.component';

const routes: Routes = [
  {
    path: '',
    component: ListEmployeeComponent,
    pathMatch: 'full'
  },
  {
    path: 'add',
    component: AddEditEmployeeComponent
  },
  {
    path: 'edit/:id',
    component: AddEditEmployeeComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
