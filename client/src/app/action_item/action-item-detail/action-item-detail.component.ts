import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators';
import { ActionItem } from 'src/app/_models/actionItem';
import { Employee } from 'src/app/_models/employee';
import { EmployeesService } from 'src/app/_services/employees.service';

@Component({
  selector: 'app-action-item-detail',
  templateUrl: './action-item-detail.component.html',
  styleUrls: ['./action-item-detail.component.css']
})
export class ActionItemDetailComponent implements OnInit {
  title: string;
  actionItem: ActionItem;
  employees: Employee[];
  name: string = "";
  feedback: string;

  constructor(public bsModalRef: BsModalRef, private employeeService: EmployeesService) { }

  ngOnInit(): void {
    this.employeeService.getEmployeeList()
    .subscribe(response => {
      console.log(response);
      this.employees = response;
      this.name = this.employees.find(x => x.id == this.actionItem.id)?.firstName + " " + 
      this.employees.find(x => x.id == this.actionItem.id)?.lastName;
    });
    this.feedback = this.actionItem.feedback ? "Yes" : "No";
  }
}
