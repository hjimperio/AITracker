import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionItem } from 'src/app/_models/actionItem';
import { ActionItemParams } from 'src/app/_models/actionItemParams';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { ActionItemService } from 'src/app/_services/action-items.service';

@Component({
  selector: 'app-action-item-list',
  templateUrl: './action-item-list.component.html',
  styleUrls: ['./action-item-list.component.css']
})
export class ActionItemListComponent implements OnInit {
  actionItems: ActionItem[];
  pagination: Pagination;
  actionItemParams: ActionItemParams;
  user: User;

  constructor(private actionItemService: ActionItemService) {
    this.actionItemParams = new ActionItemParams(this.user);
  }

  ngOnInit(): void {
    this.loadActionItems();
  }

  loadActionItems() {
    this.actionItemService.getActionItems(this.actionItemParams).subscribe(response => {
      this.actionItems = response.result;
      this.pagination = response.pagination;
    });
  }

  resetFilters() {
    this.actionItemParams = new ActionItemParams(this.user);
    this.loadActionItems();
  }

  pageChanged(event: any) {
    this.actionItemParams.pageNumber = event.page;
    this.loadActionItems();
  }

}
