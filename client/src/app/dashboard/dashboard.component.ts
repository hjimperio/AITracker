import { Component, OnInit } from '@angular/core';
import { ActionItem } from '../_models/actionItem';
import { ActionItemParams } from '../_models/actionItemParams';
import { AccountService } from '../_services/account.service';
import { ActionItemService } from '../_services/action-items.service';
import { EmployeesService } from '../_services/employees.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  single: any[];
  multi: any[];
  view: any[] = [1000, 400];
  myTime: Date;
  employeeNumbers: number = 0;
  requestNumbers: number = 0;
  elapsedNumbers: number = 0;
  dateToday: Date = new Date();
  actionItemParams: ActionItemParams;
  actionItems: ActionItem[] = [];
  changeRequestNumber: number = 0;
  cloneNumber: number = 0;
  baseNumber: number = 0;
  complexNumber: number = 0;
  fsComplexNumber: number = 0;

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


  constructor(public accountService: AccountService, private employeeService: EmployeesService, 
    private actionItemService: ActionItemService) { 
      this.actionItemParams = this.actionItemService.getActionItemParams();
    }

  ngOnInit(): void {
    this.getEmployeeNumbers();
    this.getActionItemNumbers();

    this.actionItems.forEach(x => {
      if (x.workOrderTypeRequest === "Change Request") {
        this.changeRequestNumber++;
      } else if (x.workOrderTypeRequest === "Clone") {
        this.cloneNumber++;
      } else if (x.workOrderTypeRequest === "Base") {
        this.baseNumber++;
      } else if (x.workOrderTypeRequest === "Complex") {
        this.complexNumber++;
      } else if (x.workOrderTypeRequest === "FS Complex") {
        this.fsComplexNumber++;
      }
    });

    var single = [
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
      },
      {
        "name": "Complex",
        "value": this.complexNumber
      },
      {
        "name": "FS Complex",
        "value": this.fsComplexNumber
      },
    ];
    Object.assign(this, { single });
  }

  getEmployeeNumbers() {
    this.employeeService.getEmployeeList().subscribe(response => {
      this.employeeNumbers = response.length;
    });
  }

  getActionItemNumbers() {
    this.actionItemParams.pageSize = 100;
    this.actionItemService.setActionItemParams(this.actionItemParams);
    this.actionItemService.getActionItems(this.actionItemParams).subscribe(response => {
      this.actionItems = response.result;
      console.log(this.actionItems);
    });
  }

}
