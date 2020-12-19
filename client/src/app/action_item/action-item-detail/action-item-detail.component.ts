import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ActionItem } from 'src/app/_models/actionItem';

@Component({
  selector: 'app-action-item-detail',
  templateUrl: './action-item-detail.component.html',
  styleUrls: ['./action-item-detail.component.css']
})
export class ActionItemDetailComponent implements OnInit {
  title: string;
  actionItem: ActionItem;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
}
