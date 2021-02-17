import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Employee } from 'src/app/_models/employee';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
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

  constructor(private employeeService: EmployeesService, private accountService: AccountService,
    private modalService: BsModalService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees(this.userParams).subscribe(response => {
      this.employees = response.result;
      this.pagination = response.pagination;
    });
  }

  resetFilters() {
    this.userParams = new UserParams(this.user);
    this.loadEmployees();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.loadEmployees();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
