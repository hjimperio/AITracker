import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActionItem } from 'src/app/_models/actionItem';
import { Employee } from 'src/app/_models/employee';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { ActionItemService } from 'src/app/_services/action-items.service';
import { EmployeesService } from 'src/app/_services/employees.service';

@Component({
  selector: 'app-action-item-add',
  templateUrl: './action-item-add.component.html',
  styleUrls: ['./action-item-add.component.css']
})
export class ActionItemAddComponent implements OnInit {
  addActionItemForm: FormGroup;
  employees: Employee[];
  pagination: Pagination;

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.addActionItemForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private actionItemService: ActionItemService, private router: Router, 
    private toastr: ToastrService, private fb: FormBuilder, private employeeService: EmployeesService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.employeeService.getEmployeeList()
    .subscribe(response => this.employees = response);
  }

  initializeForm() {
    this.addActionItemForm = this.fb.group({
      category: ['', Validators.required],
      division: ['', Validators.required],
      request: ['', Validators.required],
      internalEmailSubject: ['', Validators.required],
      assignedToId: ['', Validators.required],
      workOrderTypeRequest: ['', Validators.required],
      feedback: ['', Validators.required],
      notes: ['', Validators.required],
      taskNumber: ['', Validators.required],
      actionItemNumber: ['', Validators.required],
      deliveryManagerSupportId: ['', Validators.required],
      externalEmailSubject: ['', Validators.required],
      dateStarted: ['', Validators.required],
      currentTeamOwner: ['', Validators.required],
      currentIndividualAssigned: ['', Validators.required],
      remarks: ['', Validators.required],
      mapStatus: ['', Validators.required],
      dateResolved: ['', Validators.required]
    })
  }

  addActionItem() {
    if (this.addActionItemForm.get('feedback').value === "true") {
      this.addActionItemForm.patchValue({feedback: true});
    } else {
      this.addActionItemForm.patchValue({feedback: false});
    }

    this.actionItemService.addActionItem(this.addActionItemForm.value).subscribe(() => {
      this.toastr.success('Action item added successfully');
      this.router.navigateByUrl('/action-items');
    });
  }
}
