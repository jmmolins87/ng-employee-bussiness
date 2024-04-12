import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { EmployeeService } from './../../services/employee.service';

import { CivilStatus } from './../../interface/civil-status.interface';
import { Employee } from '../../interface/employee.interface';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  public civilStatus: CivilStatus[] = [
    { id: 'Soltero', name: 'Soltero' },
    { id: 'Casado', name: 'Casado' },
    { id: 'Divorciado', name: 'Divorciado' },
    { id: 'Viudo', name: 'Viudo' }
  ]
  public myForm!: FormGroup;
  public idEmployee: any;
  public actionAddEdit: string = 'Agregar';

  constructor( 
    private _route: Router, 
    private _fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _aRoute: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {
    this.myForm = this._fb.group({
      completeName: ['', [ Validators.required, Validators.maxLength(20) ]],
      email: ['', [ Validators.required, Validators.email ]],
      incomeDate: ['', [ Validators.required ]],
      phone: ['', [ Validators.required ]],
      civilStatus: ['', [ Validators.required ]],
      sex: ['', [ Validators.required ]]
    })
    this.idEmployee = this._aRoute.snapshot.params['id'];
  }

  ngOnInit() {
    if( this.idEmployee !== undefined ) {
      this.actionAddEdit = 'Editar';
    }
    this.editEmployee();
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

    if( this.idEmployee !== undefined ) {
      this._employeeService.editEmployee( employee, this.idEmployee );
      this.snackBar.open('¡¡Registro editado con éxito!!', '', {
        duration: 3000
      });
      this._route.navigate(['/employees']);
    }
  }

  editEmployee() {
    const employee: Employee = this._employeeService.getEmployee( this.idEmployee );
    this.myForm.patchValue({
      completeName: employee.completeName,
      email: employee.email,
      incomeDate: employee.incomeDate,
      phone: employee.phoneNumber,
      civilStatus: employee.civilStatus,
      sex: employee.sex
    })
  }
}
