import { Component, OnInit } from '@angular/core';
import { ActionItem } from '../_models/actionItem';
import { DashboardService } from '../_services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  elapsedNumbers: number = 0;
  requestNumbers: number = 0;
  actionItemsOpen: ActionItem[] = [];
  actionItemsElapsed: ActionItem[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getActionItems();
  }

  getActionItems() {
    this.dashboardService.getActionItems().subscribe(response => {
      this.actionItemsOpen = response.filter(a => a.mapStatus === 'open');
      this.actionItemsElapsed = response.filter(a => !a.metElapsedTarget);
      this.elapsedNumbers = response.filter(a => a.mapStatus === 'open').length;
      this.requestNumbers = response.filter(a => !a.metElapsedTarget).length;
    });
  }

}
