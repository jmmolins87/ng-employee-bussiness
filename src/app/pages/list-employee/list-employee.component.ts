import { 
  Component, 
  OnInit, 
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EmployeeService } from './../../services/employee.service';

import { Employee } from './../../interface/employee.interface';

import { ConfirmMessageComponent } from './../../components/confirm-message/confirm-message.component';


@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {

  public displayedColumns: string[] = [
    'completeName', 
    'phoneNumber', 
    'email', 
    'incomeDate', 
    'civilStatus', 
    'sex', 
    'tools'
  ];
  public dataSource = new MatTableDataSource();
  public employeeList!: Employee[];

  @ViewChild( MatPaginator, { static: true })
  public paginator!: MatPaginator;
  @ViewChild( MatSort )
  public sort!: MatSort;

  constructor( 
    private _employeeService: EmployeeService, 
    private _router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}
  
  ngOnInit() {
    this.loadEmployees();
  }

  applyFilter( event: Event ) {
    const filterValue = ( event.target as HTMLInputElement ).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadEmployees() {
    this.employeeList = this._employeeService.getEmployee();
    this.dataSource = new MatTableDataSource<any>( this.employeeList );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    this._router.navigate(['/add']);
  }

  deleteEmployee( index: number ) {

    const dialogRef = this.dialog.open( ConfirmMessageComponent, {
      width: '350px',
      data: { message: 'Está seguro que quiere elimnar el registro?'},
    });

    dialogRef.afterClosed().subscribe( result => {

      if( result === 'aceptar' ) {
        this._employeeService.deleteEmployee( index );
        this.loadEmployees();
        this.snackBar.open('¡¡Registro eliminado con éxito!!', '', {
          duration: 3000
        });
      }
    });
  }
}
