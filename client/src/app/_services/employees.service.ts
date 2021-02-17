import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Employee } from '../_models/employee';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  baseUrl = environment.apiUrl;
  employees: Employee[] = [];
  employeeCache = new Map();
  user: User;
  userParams: UserParams;

  constructor(private http: HttpClient, private accountService: AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    });
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  getEmployeeList() {
    return this.http.get<Employee[]>(this.baseUrl + 'users/list');
  }

  getEmployees(userParams: UserParams) {
    var response = this.employeeCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('orderBy', userParams.orderBy.toString());
    
    return getPaginatedResult<Employee[]>(this.baseUrl + 'users', params, this.http)
      .pipe(map(response => {
        this.employeeCache.set(Object.values(userParams).join('-'), response);
        return response;
      }));
  }

  getEmployee(username: string) {
    const employee = [...this.employeeCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Employee) => member.username === username);

    if (employee) {
      return of(employee);
    }

    return this.http.get<Employee>(this.baseUrl + 'users/' + username);
  }

  updateMember(employee: Employee) {
    return this.http.put(this.baseUrl + 'users', employee).pipe(
      map(() => {
        const index = this.employees.indexOf(employee);
        this.employees[index] = employee;
      })
    );
  }
}
