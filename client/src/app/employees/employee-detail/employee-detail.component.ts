import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/_models/employee';
import { EmployeesService } from 'src/app/_services/employees.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee;

  constructor(private employeeService: EmployeesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadEmployee();
  }

  loadEmployee() {
    this.employeeService.getEmployee(this.route.snapshot.paramMap.get('username')).subscribe(member => {
      this.employee = member;
      //this.galleryImages = this.getImages();
    });
  }

}
