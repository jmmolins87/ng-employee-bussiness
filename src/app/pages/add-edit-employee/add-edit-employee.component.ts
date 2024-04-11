import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { EmployeeService } from './../../services/employee.service';

import { CivilStatus } from './../../interface/civil-status.interface';
import { Employee } from '../../interface/employee.interface';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent {

  public civilStatus: CivilStatus[] = [
    { id: 'Soltero', name: 'Soltero' },
    { id: 'Casado', name: 'Casado' },
    { id: 'Divorciado', name: 'Divorciado' },
    { id: 'Viudo', name: 'Viudo' }
  ]
  public myForm!: FormGroup;

  constructor( 
    private _route: Router, 
    private fb: FormBuilder,
    private _employeeService: EmployeeService,
    public snackBar: MatSnackBar
  ) {
    this.myForm = this.fb.group({
      completeName: ['', [ Validators.required, Validators.maxLength(20) ]],
      email: ['', [ Validators.required, Validators.email ]],
      incomeDate: ['', [ Validators.required ]],
      phone: ['', [ Validators.required, Validators.minLength(9) ]],
      civilStatus: ['', [ Validators.required, Validators.minLength(10) ]],
      sex: ['', [ Validators.required, Validators.minLength(1) ]],
    })
  }

  goToList() {
    this._route.navigate(['/employees']);
  }
  
  saveEmployee() {
    const employee: Employee = {
      completeName: this.myForm.get('completeName')?.value,
      email: this.myForm.get('email')?.value,
      incomeDate: this.myForm.get('incomeDate')?.value,
      phoneNumber: this.myForm.get('phone')?.value,
      civilStatus: this.myForm.get('civilStatus')?.value,
      sex: this.myForm.get('sex')?.value
    }
    this._employeeService.addEmployee( employee );
    this.snackBar.open('¡¡Registro añadido con éxito!!', '', {
      duration: 3000
    });
    this._route.navigate(['/employees']);
  }
}
