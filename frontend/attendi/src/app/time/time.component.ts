import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {TimeUnit} from "ngx-material-timepicker/src/app/material-timepicker/models/time-unit.enum";

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeComponent),
      multi: true
    }
  ]
})

export class TimeComponent implements ControlValueAccessor, OnInit {

  time: FormControl;
  private propagateChange: any;
  /*@Input()
  min = '08:00';
  @Input()
  max = '18:00';*/
  @Input()
  placeholder: string;
  @Input()
  hint: any;
  @Input()
  required = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    let validator = null;
    if (this.required) {
      validator = Validators.required;
    }
    this.time = this.fb.control(null, validator);
    this.time.valueChanges.subscribe((newValue) => {
      this.propagateChange(newValue);
    });
  }


  writeValue(obj: any): void {
    this.time.patchValue(obj, {emitEvent: false});
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

}

