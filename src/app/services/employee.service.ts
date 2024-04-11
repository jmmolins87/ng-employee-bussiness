import { Injectable } from '@angular/core';

import { Employee } from '../interface/employee.interface';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public employeeList: Employee[] = [
    {
      completeName: 'Lucas Martínez',
      phoneNumber: 600000000,
      email: 'lmartinez@correo.com',
      incomeDate: new Date(),
      civilStatus: 'Soltero',
      sex: 'Masculino'
    },
    {
      completeName: 'Rodrigo Aliaga',
      phoneNumber: 600000000,
      email: 'raliaga@correo.com',
      incomeDate: new Date(),
      civilStatus: 'Casado',
      sex: 'Masculino'
    },
    {
      completeName: 'María Funes',
      phoneNumber: 600000000,
      email: 'mfunes@correo.com',
      incomeDate: new Date(),
      civilStatus: 'Casada',
      sex: 'Femenino'
    },
    {
      completeName: 'Lucas Juarez',
      phoneNumber: 600000000,
      email: 'ljuarez@correo.com',
      incomeDate: new Date(),
      civilStatus: 'Casado',
      sex: 'Masculino'
    }
  ]

  constructor() { }

  getEmployee() {
    return this.employeeList.slice();
  }

  deleteEmployee( index: number ) {
    this.employeeList.splice( index, 1 );
  }
}
