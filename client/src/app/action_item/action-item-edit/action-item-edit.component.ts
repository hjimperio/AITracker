import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActionItem } from 'src/app/_models/actionItem';
import { Employee } from 'src/app/_models/employee';
import { UserParams } from 'src/app/_models/userParams';
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
  feedback: boolean = false;

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

  loadActionItem() {
    this.actionItemService.getActionItem(this.actionItemId)
      .subscribe(actionItem => {
        this.actionItem = actionItem;
        this.editActionItemForm.setValue({
          category: this.actionItem.category,
          division: this.actionItem.division,
          request: this.actionItem.request,
          internalEmailSubject: this.actionItem.internalEmailSubject,
          assignedToId: this.actionItem.assignedToId,
          workOrderTypeRequest: this.actionItem.workOrderTypeRequest,
          feedback: this.actionItem.feedback,
          notes: this.actionItem.notes,
          taskNumber: this.actionItem.taskNumber,
          actionItemNumber: this.actionItem.actionItemNumber,
          deliveryManagerSupportId: this.actionItem.deliveryManagerSupportId,
          externalEmailSubject: this.actionItem.externalEmailSubject,
          dateStarted: this.actionItem.dateStarted,
          currentTeamOwner: this.actionItem.currentTeamOwner,
          currentIndividualAssigned: this.actionItem.currentIndividualAssigned,
          remarks: this.actionItem.remarks,
          mapStatus: this.actionItem.mapStatus,
          dateResolved: this.actionItem.dateResolved
        });
      });
  }

  initializeForm() {
    this.editActionItemForm = this.fb.group({
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
