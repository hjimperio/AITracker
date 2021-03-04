import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ActionItem } from 'src/app/_models/actionItem';
import { Employee } from 'src/app/_models/employee';
import { UserParams } from 'src/app/_models/userParams';

@Component({
  selector: 'app-action-item-detail',
  templateUrl: './action-item-detail.component.html',
  styleUrls: ['./action-item-detail.component.css']
})
export class ActionItemDetailComponent implements OnInit {
  title: string;
  actionItem: ActionItem;
  feedback: string;
  userParams: UserParams;

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this.feedback = this.actionItem.feedback ? "Yes" : "No";
  }
}
