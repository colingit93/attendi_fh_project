import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AttendanceItemService} from '../service/attendance-item.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-attendance-confirm',
  templateUrl: './attendance-confirm.component.html',
  styleUrls: ['./attendance-confirm.component.scss']
})
export class AttendanceConfirmComponent implements OnInit {

  form: FormGroup;
  title: string;
  password: string;
  attendanceItemId: any;
  attendanceItemForm: FormGroup;
  selectedFile: any;
  presence =  false;


  constructor(private userService: UserService, private fb: FormBuilder, private dialogRef: MatDialogRef<AttendanceConfirmComponent>,
              private attendanceItemService: AttendanceItemService, private snackBar: MatSnackBar, private http: HttpClient,
              @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.attendanceItemId = data.attendanceItemId;
    this.password = data.password;
  }


  ngOnInit() {
    this.form = this.fb.group({
      title: [this.title, []],
      input: ['', []],
      absence_note: []
    });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('content_type', this.selectedFile.type);
    this.http.post('/api/media', fd)
      .subscribe((response: any) => {
        this.form.controls.absence_note.setValue(response.id);
      });
  }

  checkPassword() {
    if (this.form.controls.input.value === this.password || this.form.controls.absence_note.value) {
      const fileId = this.form.controls.absence_note.value;
      alert(fileId);
      if (this.form.controls.input.value === this.password) {
        this.presence = true;
      }
      this.attendanceItemService.getAttendanceItem(this.attendanceItemId).subscribe((res: any) => {
        this.attendanceItemForm = this.fb.group({
          id: res.id,
          course_session: res.course_session.id,
          present: this.presence,
          absence_note: fileId,
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
