import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActionItem } from 'src/app/_models/actionItem';
import { ActionItemService } from 'src/app/_services/action-items.service';

@Component({
  selector: 'app-action-item-add',
  templateUrl: './action-item-add.component.html',
  styleUrls: ['./action-item-add.component.css']
})
export class ActionItemAddComponent implements OnInit {
  addActionItemForm: FormGroup;

  // @ViewChild('addForm') addForm: NgForm;
  // model: any = {};
  // @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
  //   if (this.addForm.dirty) {
  //     $event.returnValue = true;
  //   }
  // }

  constructor(private actionItemService: ActionItemService, private router: Router, 
    private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
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
