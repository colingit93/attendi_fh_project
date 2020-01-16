import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AttendanceItemService} from '../service/attendance-item.service';

@Component({
  selector: 'app-attendance-confirm',
  templateUrl: './attendance-confirm.component.html',
  styleUrls: ['./attendance-confirm.component.scss']
})
export class AttendanceConfirmComponent implements OnInit {

  form: FormGroup;
  title: string;
  password: string;
  userId: number;
  sessionId: number;
  attendanceItemForm: FormGroup;


  constructor(private userService: UserService, private fb: FormBuilder, private dialogRef: MatDialogRef<AttendanceConfirmComponent>,
              private attendanceItemService: AttendanceItemService,
              @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.password = data.password;
    this.userId = data.userId;
    this.sessionId = data.sessionId;
  }


  ngOnInit() {
    this.form = this.fb.group({
      title: [this.title, []],
      input: ['', []],
    });
  }

  checkCode() {
    if (this.form.controls.input.value === this.password) {
      this.attendanceItemService.getAttendanceItem(this.sessionId, this.userId).subscribe((res: any) => {
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
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
