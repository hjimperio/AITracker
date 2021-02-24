import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.css']
})
export class DateTimeInputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() name: string;
  @Input() maxDate: Date;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(@Self() public ngControl: NgControl) { }

  ngOnInit(): void {
  }

  writeValue(obj: any): void {
  }
  
  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

}
