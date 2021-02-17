import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  single: any[];
  multi: any[];
  view: any[] = [1000, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'AI REQUESTS';
  showYAxisLabel = true;
  yAxisLabel = 'Overall';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#ABBBBB']
  };

  
  constructor(public accountService: AccountService) { 
    var single = [
      {
        "name": "Change Request",
        "value": 10
      },
      {
        "name": "Clone",
        "value": 10
      },
      {
        "name": "Base",
        "value": 5
      },
      {
        "name": "Complex",
        "value": 7
      },
      {
        "name": "FS Complex",
        "value": 4
      },
    ];
    Object.assign(this, { single });
  }

  ngOnInit(): void {
  }

  

}
