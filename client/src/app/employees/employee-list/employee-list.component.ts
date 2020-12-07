import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/_models/employee';
import { EmployeesService } from 'src/app/_services/employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees$: Observable<Employee[]>;

  constructor(private employeeService: EmployeesService) { }

  ngOnInit(): void {
    this.employees$ = this.employeeService.getEmployees();
  }

}
