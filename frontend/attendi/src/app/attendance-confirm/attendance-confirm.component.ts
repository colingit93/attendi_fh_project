import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AttendanceItemService} from '../service/attendance-item.service';
import DateTimeFormat = Intl.DateTimeFormat;




@Component({
  selector: 'app-attendance-confirm',
  templateUrl: './attendance-confirm.component.html',
  styleUrls: ['./attendance-confirm.component.scss']
})
export class AttendanceConfirmComponent implements OnInit {

  form: FormGroup;
  title: string;
  password: string;
  isActive = false;
  attendanceItemId: any;
  attendanceItemForm: FormGroup;


  constructor(private userService: UserService, private fb: FormBuilder, private dialogRef: MatDialogRef<AttendanceConfirmComponent>,
              private attendanceItemService: AttendanceItemService, private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.attendanceItemId = data.attendanceItemId;
    this.password = data.password;
  }


  ngOnInit() {
    this.attendanceItemService.getAttendanceItem(this.attendanceItemId).subscribe((res: any) => {
      const date = res.course_session.date;
      const start = res.course_session.start_time;
      const end = res.course_session.end_time;
      const actual = new Date();
      const actualTime = new Date(actual.setTime( actual.getTime() - actual.getTimezoneOffset() * 60000)).toISOString().slice(11, 19);
      const actualDate = new Date(actual.setTime( actual.getTime() - actual.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);
      // alert(actualDate);
      if (date === actualDate && actualTime > start && actualTime < end) {
        this.isActive = true;
      }

    });
    this.form = this.fb.group({
      title: [this.title, []],
      input: ['', []],
    });
  }

  checkCode() {
    if (this.form.controls.input.value === this.password) {
      this.attendanceItemService.getAttendanceItem(this.attendanceItemId).subscribe((res: any) => {
        this.attendanceItemForm = this.fb.group({
          id: res.id,
          student: res.student,
          course_session: res.course_session,
          present: true,
          absence_note: null,
        });
        this.attendanceItemService.updateAttendanceItem(this.attendanceItemForm.value).subscribe((resp: any) => {
        });
      });
      this.closeDialog();
    } else {
      this.snackBar.open('Wrong Password!', 'Dismiss',
        {
          duration: 3000
        });
    }

  }

  closeDialog() {
    this.dialogRef.close();
  }
}
