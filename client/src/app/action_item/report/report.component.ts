import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActionItemReportParams } from 'src/app/_models/actionItemReportParams';
import { ActionItemService } from 'src/app/_services/action-items.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @ViewChild('reportForm') reportForm: NgForm;
  actionItemReportParams: ActionItemReportParams;
  dateTo: Date = new Date();
  dateFrom: Date = new Date();

  constructor(private actionItemService: ActionItemService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.actionItemReportParams = new ActionItemReportParams();
  }

  generateReport() {
    this.actionItemReportParams.dateFrom = this.dateFrom.toLocaleString();
    this.actionItemReportParams.dateTo = this.dateTo.toLocaleString();

    this.actionItemService.generateReport(this.actionItemReportParams).subscribe(data => {
      saveAs(data, `Action Item Report.xlsx`);
      this.toastr.success('Report Downloaded');
      this.reportForm.reset();
    });
  }

}
