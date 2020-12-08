import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Employee } from 'src/app/_models/employee';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { EmployeesService } from 'src/app/_services/employees.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  employee: Employee;
  user: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private employeeService: EmployeesService, 
    private toastr: ToastrService) { 
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    }

    ngOnInit(): void {
      this.loadMember();
    }
  
    loadMember() {
      this.employeeService.getEmployee(this.user.username).subscribe(employee => {
        this.employee = employee;
      })
    }

    updateMember() {
      this.employeeService.updateMember(this.employee).subscribe(() => {
        this.toastr.success('Profile updated successfully');
        this.editForm.reset(this.employee);
      });
    }

}
