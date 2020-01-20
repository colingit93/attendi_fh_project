import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateComponent),
  multi: true
};
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
  ],
})
export class DateComponent implements OnInit, ControlValueAccessor  {
  date: FormControl;
  private propagateChange: any;

  @Input()
  minDate: any;
  @Input()
  maxDate: any;
  @Input()
  startDate: any;
  @Input()
  placeholder: string;
  @Input()
  hint: any;
  @Input()
  required = false;

  constructor(private fb: FormBuilder, private adapter: DateAdapter<any>) {
  }

  ngOnInit() {
    let validator = null;
    if (this.required) {
      validator = Validators.required;
    }
    this.adapter.setLocale('de');
    this.date = this.fb.control(null, validator);
    this.date.valueChanges.subscribe((newValue) => {
      const newDate = newValue ? new Date(newValue.getTime() - (newValue.getTimezoneOffset() * 60000)).toISOString().slice(0, 10) : null;
      this.propagateChange(newDate);
    });
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    // do nothing
  }

  setDisabledState(isDisabled: boolean): void {
    // do nothing
  }

  writeValue(obj: any): void {
    this.date.patchValue(obj, {emitEvent: false});
  }
}
