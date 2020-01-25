import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {resolveFileWithPostfixes} from '@angular/compiler-cli/ngcc/src/utils';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MediaComponent),
  multi: true
};

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  providers: [
    CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
  ]
})
export class MediaComponent implements OnInit, ControlValueAccessor {

  file: FormControl;
  selectedImage: any;
  private propagateChange: any;

  @Input()
  currentImage: any;
  @Input()
  acceptedInput = '*';

  constructor(private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.file = this.fb.control(null);
    this.file.valueChanges.subscribe((newValue) => {
    });
  }

  onFileSelected(event) {
    this.selectedImage = event.target.files[0];
    this.onUpload();
  }

  onUpload() {
    const fd = new FormData();
    fd.append('file', this.selectedImage, this.selectedImage.name);
    fd.append('content_type', this.selectedImage.type);
    this.http.post('/api/media', fd)
      .subscribe((response: any) => {
          this.propagateChange(response.id);
      });
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    this.file.patchValue(obj, {emitEvent: false});
  }

}
