import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-attendance-confirm',
  templateUrl: './attendance-confirm.component.html',
  styleUrls: ['./attendance-confirm.component.scss']
})
export class AttendanceConfirmComponent implements OnInit {

  form: FormGroup;
  title: string;
  password: string;


  constructor(private userService: UserService, private fb: FormBuilder, private dialogRef: MatDialogRef<AttendanceConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.password = data.password;
  }


  ngOnInit() {
    this.form = this.fb.group({
      title: [this.title, []],
      input: ['', []],
    });
  }

  checkCode() {
    if (this.form.controls.input.value === this.password) {
    }
      }

  closeDialog() {
    this.dialogRef.close();
  }
}
