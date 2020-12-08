import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Employee } from '../_models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  baseUrl = environment.apiUrl;
  employees: Employee[] = [];

  constructor(private http: HttpClient) { }

  getEmployees() {
    if (this.employees.length > 0) return of(this.employees); 
    return this.http.get<Employee[]>(this.baseUrl + 'users').pipe(
      map(employees => {
        this.employees = employees;
        return employees;
      })
    );
  }

  getEmployee(username: string) {
    const employee = this.employees.find(x => x.username === username);
    if (employee !== undefined) return of(employee);
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
