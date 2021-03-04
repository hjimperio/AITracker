import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Employee } from 'src/app/_models/employee';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { EmployeesService } from 'src/app/_services/employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  modalRef: BsModalRef;

  constructor(private employeeService: EmployeesService, private modalService: BsModalService) { 
    this.userParams = this.employeeService.getUserParams();
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.setUserParams(this.userParams);
    this.employeeService.getEmployees(this.userParams).subscribe(response => {
      this.employees = response.result;
      this.pagination = response.pagination;
    });
  }

  resetFilters() {
    this.userParams = this.employeeService.resetUserParams();
    this.loadEmployees();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.employeeService.setUserParams(this.userParams);
    this.loadEmployees();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
