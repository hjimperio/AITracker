import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
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
    EmployeeAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    //{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    //{provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
