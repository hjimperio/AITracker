import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActionItem } from '../_models/actionItem';
import { Employee } from '../_models/employee';
import { User } from '../_models/user';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = environment.apiUrl;
  user: User;

  constructor(private http: HttpClient, private accountService: AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    });
  }

  getEmployeeList() {
    return this.http.get<Employee[]>(this.baseUrl + 'users/list');
  }

  getActionItems(date: string) {
    return this.http.get<ActionItem[]>(this.baseUrl + 'actionitems/list' + "?dateToday=" + date);
  }

}
