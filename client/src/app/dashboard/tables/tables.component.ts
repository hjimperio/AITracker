import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActionItem } from 'src/app/_models/actionItem';
import { ActionItemParams } from 'src/app/_models/actionItemParams';
import { Pagination } from 'src/app/_models/pagination';
import { ActionItemService } from 'src/app/_services/action-items.service';
import { DashboardService } from 'src/app/_services/dashboard.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  @Input() title: string = "";
  @Input() actionItems = new EventEmitter<ActionItem[]>();
  pagination: Pagination;
  actionItemParams: ActionItemParams;

  constructor() {
  }

  ngOnInit(): void {
    //this.loadActionItems(this.title);
  }

  // loadActionItems(title: string) {
  //   this.dashboardService.getActionItems(title).subscribe(response => {
  //     this.actionItems = response.result;
  //     this.pagination = response.pagination;
  //   });
  // }

  // pageChanged(event: any) {
  //   this.actionItemParams.pageNumber = event.page;
  //   this.loadActionItems(this.title, this.actionItemParams.pageNumber);
  // }

}
