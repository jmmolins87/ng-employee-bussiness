import { 
  Component, 
  OnInit, 
  ViewChild
} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { EmployeeService } from './../../services/employee.service';

import { Employee } from './../../interface/employee.interface';

import { ConfirmMessageComponent } from './../../components/confirm-message/confirm-message.component';


@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {

  public displayedColumns: string[] = ['completeName', 'phoneNumber', 'email', 'incomeDate', 'civilStatus', 'sex', 'tools'];
  public dataSource = new MatTableDataSource();
  public employeeList!: Employee[];

  @ViewChild( MatPaginator, { static: true })
  public paginator!: MatPaginator;
  @ViewChild( MatSort )
  public sort!: MatSort;

  constructor( 
    private _employeeService: EmployeeService, 
    public dialog: MatDialog 
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

  openDialog( element: string ) {}

  deleteEmployee( index: number ) {

    const dialogRef = this.dialog.open( ConfirmMessageComponent, {
      width: '350px',
      data: { message: 'Está seguro que quiere elimnar el registro?'},
    });

    dialogRef.afterClosed().subscribe( result => {
      if( result === 'aceptar' ) {
        this._employeeService.deleteEmployee( index );
        this.loadEmployees();
      }
    });
  }
}
