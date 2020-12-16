import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @ViewChild('addForm') addForm: NgForm;
  model: any = {};
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.addForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private actionItemService: ActionItemService, private router: Router, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addActionItem() {
    //console.log(this.model);
    this.actionItemService.addActionItem(this.model).subscribe(() => {
      this.toastr.success('Action item added successfully');
      this.router.navigateByUrl('/action-items');
    });
  }

}
