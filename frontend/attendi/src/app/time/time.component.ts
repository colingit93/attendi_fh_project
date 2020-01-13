import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';


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

  @Input()
  placeholder: string;
  @Input()
  hint: any;
  @Input()
  required = false;

  /*title = 'clock';
  private exportTime = { hour: 8, minute: 45, meriden: 'PM', format: 24 };*/

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
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
