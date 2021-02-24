import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActionItem } from 'src/app/_models/actionItem';
import { Employee } from 'src/app/_models/employee';
import { ActionItemService } from 'src/app/_services/action-items.service';
import { EmployeesService } from 'src/app/_services/employees.service';

@Component({
  selector: 'app-action-item-edit',
  templateUrl: './action-item-edit.component.html',
  styleUrls: ['./action-item-edit.component.css']
})
export class ActionItemEditComponent implements OnInit {
  editActionItemForm: FormGroup;
  actionItem: ActionItem;
  actionItemId: number = parseInt(this.route.snapshot.paramMap.get('id'));
  employees: Employee[];

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editActionItemForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private actionItemService: ActionItemService, private router: Router, 
    private toastr: ToastrService, private fb: FormBuilder, private route: ActivatedRoute,
    private employeeService: EmployeesService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.employeeService.getEmployeeList()
    .subscribe(response => this.employees = response);
    this.loadActionItem();
  }

  initializeForm() {
    this.editActionItemForm = this.fb.group({
      region: ['', Validators.required],
      division: ['', Validators.required],
      internalEmailSubject: ['', Validators.required],
      externalEmailSubject: ['', Validators.required],
      workOrderTypeRequest: ['', Validators.required],
      feedback: ['', Validators.required],
      notes: ['', Validators.required],
      taskNumber: ['', Validators.nullValidator],
      actionItemNumber: ['', Validators.nullValidator],
      aiCreatedBy: ['', Validators.nullValidator],
      dateStarted: [new Date(), Validators.required],
      dateResolved: [new Date(), Validators.nullValidator],
      mapStatus: ['', Validators.required]
    });
  }

  loadActionItem() {
    this.actionItemService.getActionItem(this.actionItemId)
      .subscribe(actionItem => {
        this.actionItem = actionItem;
        this.editActionItemForm.patchValue(this.actionItem);
        this.editActionItemForm.patchValue({
          dateStarted: new Date(this.actionItem.dateStarted),
          dateResolved: new Date(this.actionItem.dateResolved)
        });
      });
  }

  updateActionItem() {
    if (this.editActionItemForm.get('feedback').value === "true") {
      this.editActionItemForm.patchValue({feedback: true});
    } else {
      this.editActionItemForm.patchValue({feedback: false});
    }

    this.actionItemService.updateActionItem(this.editActionItemForm.value, this.actionItemId).subscribe(() => {
      this.toastr.success('Action Item Updated Successfully');
      this.editActionItemForm.reset(this.actionItem);
      this.loadActionItem();
    });
  }

}
