import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionItemAddComponent } from './action_item/action-item-add/action-item-add.component';
import { ActionItemDetailComponent } from './action_item/action-item-detail/action-item-detail.component';
import { ActionItemEditComponent } from './action_item/action-item-edit/action-item-edit.component';
import { ActionItemListComponent } from './action_item/action-item-list/action-item-list.component';
import { ReportComponent } from './action_item/report/report.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeAddComponent } from './employees/employee-add/employee-add.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard]},
      {path: 'employees', component: EmployeeListComponent},
      {path: 'employees/:username', component: EmployeeDetailComponent},
      {path: 'employee/add', component: EmployeeAddComponent},
      {path: 'employee/edit', component: EmployeeEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'action-items', component: ActionItemListComponent},
      {path: 'action-items/:id', component: ActionItemDetailComponent},
      {path: 'action-item/add', component: ActionItemAddComponent},
      {path: 'action-item/report', component: ReportComponent},
      {path: 'action-item/edit/:id', component: ActionItemEditComponent}
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
