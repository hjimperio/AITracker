import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ActionItemListComponent } from './action_item/action-item-list/action-item-list.component';
import { ActionItemDetailComponent } from './action_item/action-item-detail/action-item-detail.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { ActionItemEditComponent } from './action_item/action-item-edit/action-item-edit.component';
import { ActionItemAddComponent } from './action_item/action-item-add/action-item-add.component';
import { EmployeeAddComponent } from './employees/employee-add/employee-add.component';
import { SharedModule } from './_modules/shared.module';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { EmployeeCardComponent } from './employees/employee-card/employee-card.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from '@danielmoncada/angular-datetime-picker';
import { DateTimeInputComponent } from './_forms/date-time-input/date-time-input.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BarchartComponent } from './dashboard/barchart/barchart.component';
import { TotalCardsComponent } from './dashboard/total-cards/total-cards.component';
import { TablesComponent } from './dashboard/tables/tables.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ActionItemListComponent,
    ActionItemDetailComponent,
    NotFoundComponent,
    ServerErrorComponent,
    TestErrorsComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    EmployeeEditComponent,
    ActionItemEditComponent,
    ActionItemAddComponent,
    EmployeeAddComponent,
    EmployeeCardComponent,
    DateInputComponent,
    TextInputComponent,
    DateTimeInputComponent,
    DashboardComponent,
    BarchartComponent,
    TotalCardsComponent,
    TablesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'en-PH'},
  ],
  bootstrap: [AppComponent],
  entryComponents: [ActionItemDetailComponent]
})
export class AppModule { }
