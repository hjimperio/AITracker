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
  chartData: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getActionItems();
  }

  getActionItems() {
    this.dashboardService.getActionItems().subscribe(response => {
      this.actionItemsOpen = response.filter(a => a.mapStatus === 'open');
      this.actionItemsElapsed = response.filter(a => !a.metElapsedTarget && a.mapStatus == 'completed');
      this.elapsedNumbers = response.filter(a => !a.metElapsedTarget && a.mapStatus == 'completed').length;
      this.requestNumbers = response.filter(a => a.mapStatus === 'open' ).length;
      const changeRequestNumber = response.filter(r => r.workOrderTypeRequest === 'Change Request').map(values => {
        return values.elapsedDays;
      });
      const cloneNumber = response.filter(r => r.workOrderTypeRequest === 'Clone').map(values => {
        return values.elapsedDays;
      });
      const baseNumber = response.filter(r => r.workOrderTypeRequest === 'Base').map(values => {
        return values.elapsedDays;
      });
      
      this.chartData = [
        {
          "name": "Change Request",
          "value": this.getAverages(changeRequestNumber)
        },
        {
          "name": "Clone",
          "value": this.getAverages(cloneNumber)
        },
        {
          "name": "Base",
          "value": this.getAverages(baseNumber)
        }
      ];
    });
  }

  getAverages(data: any[]) {
    const average = data.reduce(function (sum, value) {
        return sum + value;
    }, 0) / data.length;

    return average;
  }

}
