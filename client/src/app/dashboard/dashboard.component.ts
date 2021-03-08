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
  date: Date = new Date();

  //
  changeRequestNumber: number = 0;
  cloneNumber: number = 0;
  baseNumber: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getActionItems();
  }

  getActionItems() {
    const date = this.date.toLocaleString();
    console.log(date);
    this.dashboardService.getActionItems(date).subscribe(response => {
      this.actionItemsOpen = response.filter(a => a.mapStatus === 'open');
      this.actionItemsElapsed = response.filter(a => !a.metElapsedTarget && a.mapStatus == 'completed');
      this.elapsedNumbers = response.filter(a => !a.metElapsedTarget && a.mapStatus == 'completed').length;
      this.requestNumbers = response.filter(a => a.mapStatus === 'open' ).length;
      this.changeRequestNumber = this.getAverages(response, 'Change Request');
      this.cloneNumber = this.getAverages(response, 'Clone');
      this.baseNumber = this.getAverages(response, 'Base');

      this.chartData = [
        {
          "name": "Change Request",
          "value": this.changeRequestNumber
        },
        {
          "name": "Clone",
          "value": this.cloneNumber
        },
        {
          "name": "Base",
          "value": this.baseNumber
        }
      ];
      
    });
  }

  getAverages(actionItem: ActionItem[], predicate: string) {
    var data = actionItem.filter(r => r.workOrderTypeRequest === predicate);
    var average = 0;

    if(data.length != 0) {
      var total = data.map(values => values.elapsedDays);
      average = total.reduce((sum, value) => {
        return sum + value;
      }, 0) / data.length;
    }

    return average;
  }

}
