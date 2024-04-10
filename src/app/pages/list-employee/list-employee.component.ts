import { 
  AfterViewInit, 
  Component, 
  OnInit, 
  ViewChild
} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { EmployeeService } from './../../services/employee.service';
import { Employee } from './../../interface/employee.interface';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements AfterViewInit, OnInit {

  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public dataSource = new MatTableDataSource( ELEMENT_DATA );
  public employeeList!: Employee[];

  @ViewChild( MatPaginator, { static: true })
  public paginator!: MatPaginator;
  @ViewChild( MatSort )
  public sort!: MatSort;

  constructor( private _employeeService: EmployeeService ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter( event: Event ) {
    const filterValue = ( event.target as HTMLInputElement ).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadEmployees() {
    this.employeeList = this._employeeService.getEmployee();
    console.log( this.employeeList )
  }
}
