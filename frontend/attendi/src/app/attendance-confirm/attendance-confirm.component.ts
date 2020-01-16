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
  code: string;


  constructor(private userService: UserService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<AttendanceConfirmComponent>,
              // @Inject(MAT_DIALOG_DATA) private dialogData: any)
              // console.log(this.dialogData),
              @Inject(MAT_DIALOG_DATA) data) {
              this.code = data.code;
              this.title = data.title;
  }


  ngOnInit() {

    this.form = this.fb.group({
      title: [this.title, []],
      code: [this.code, []],
    });
  }


  actionFunction() {
   // this.userService.logout();
    this.dialogRef.close(this.form.value);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
