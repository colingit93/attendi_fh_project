import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseSessionService} from '../service/coursesession.service';
import {LocationService} from '../service/location.service';
import {UserService} from '../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AttendanceConfirmComponent} from '../attendance-confirm/attendance-confirm.component';
import {AttendanceItemService} from '../service/attendance-item.service';


@Component({
  selector: 'app-coursesession-list',
  templateUrl: './coursesession-list.component.html',
  styleUrls: ['./coursesession-list.component.scss']
})
export class CoursesessionListComponent implements OnInit {

  currentUser: any;
  sessionPassword: string;
  attendanceItems: any[];
  user: any;
  attendanceItemId: number;
  displayedColumns = ['location', 'mandatory', 'date', 'start_time', 'end_time', 'course', 'student_group', 'present', 'absence_note', 'id'];

  constructor(private http: HttpClient, private courseSessionService: CourseSessionService, public locationService: LocationService,
              private userService: UserService, private router: Router, private matDialog: MatDialog, private route: ActivatedRoute,
              private attendanceItemService: AttendanceItemService) {
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    this.currentUser = data.currentUser;
    this.attendanceItemService.getUserAttendanceList(this.currentUser.id).subscribe((response: any[]) => {
      this.attendanceItems = response;
    });
  }


  deleteCourseSession(courseSession: any) {
    this.courseSessionService.deleteCourseSession(courseSession)
      .subscribe(() => {
        this.ngOnInit();
      });
  }


  openConfirmDialog(attendanceId: number) {
    this.attendanceItemService.getAttendanceItem(attendanceId).subscribe((item: any) => {
      this.sessionPassword = item.course_session.password;

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.id = 'attendance-confirm-component';
      dialogConfig.width = '600px';
      dialogConfig.data = {
        title: 'Presence Confirmation',
        attendanceItemId: attendanceId,
        password: this.sessionPassword
      };
      const dialogRef = this.matDialog.open(AttendanceConfirmComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(
        (res) => {
          this.attendanceItemService.getUserAttendanceList(this.currentUser.id).subscribe((response: any[]) => {
            this.attendanceItems = response;
          });
        });
    });

  }

}
