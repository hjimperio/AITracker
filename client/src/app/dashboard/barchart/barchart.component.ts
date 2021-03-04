import { Component, Input, OnInit } from '@angular/core';
import { ActionItem } from 'src/app/_models/actionItem';
import { ActionItemParams } from 'src/app/_models/actionItemParams';
import { ActionItemService } from 'src/app/_services/action-items.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  // Chart options
  dateToday: Date = new Date();
  chartData: any[]; // Data
  view: any[] = [1000, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'AI REQUESTS';
  showYAxisLabel = true;
  yAxisLabel = 'Elapsed Averages';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#ABBBBB']
  };

  // Data
  changeRequestNumber: number = 0;
  cloneNumber: number = 0;
  baseNumber: number = 0;
  complexNumber: number = 0;
  fsComplexNumber: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.getActionItemNumbers();
  }

  getActionItemNumbers() {
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
  }
}
