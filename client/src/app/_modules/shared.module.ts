import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    TabsModule.forRoot(),
    NgxDatatableModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    NgxChartsModule
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    NgxDatatableModule,
    BsDatepickerModule,
    TimepickerModule,
    PaginationModule,
    ButtonsModule,
    ModalModule,
    NgxChartsModule
  ]
})
export class SharedModule { }
