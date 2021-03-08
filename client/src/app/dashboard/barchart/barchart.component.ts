import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActionItem } from 'src/app/_models/actionItem';
import { ActionItemParams } from 'src/app/_models/actionItemParams';
import { ActionItemService } from 'src/app/_services/action-items.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  @Input() chartData = new EventEmitter<any[]>(); // Data
  @Input() dateToday: Date = new Date();

  // Chart options
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

  constructor() {}

  ngOnInit(): void {
  }
}
