import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/_models/employee';
import { Pagination } from 'src/app/_models/pagination';
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
  mytime: Date;

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
      region: ['', Validators.required],
      division: ['', Validators.required],
      internalEmailSubject: ['', Validators.required],
      externalEmailSubject: ['', Validators.required],
      workOrderTypeRequest: ['', Validators.required],
      feedback: ['', Validators.required],
      notes: ['', Validators.required],
      taskNumber: ['', Validators.nullValidator],
      actionItemNumber: ['', Validators.nullValidator],
      aiCreatedBy: ['0', Validators.nullValidator],
      mapStatus: ['', Validators.required],
      dateStarted: ['', Validators.required],
      dateResolved: [new Date(), Validators.nullValidator]
    });
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
