import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseSessionService} from '../service/coursesession.service';
import {LocationService} from '../service/location.service';
import {UserService} from '../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AttendanceConfirmComponent} from '../attendance-confirm/attendance-confirm.component';


@Component({
  selector: 'app-coursesession-list',
  templateUrl: './coursesession-list.component.html',
  styleUrls: ['./coursesession-list.component.scss']
})
export class CoursesessionListComponent implements OnInit {

  currentUser: any;
  sessionId: number;
  sessionPassword: string;
  userProfile: any;
  courseSessions: any[];
  user: any;
  code: any;
  displayedColumns = ['location', 'mandatory', 'date', 'start_time', 'end_time', 'course', 'student_group', 'id'];

  constructor(private http: HttpClient, private courseSessionService: CourseSessionService, public locationService: LocationService,
              private userService: UserService, private router: Router, private matDialog: MatDialog, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    this.currentUser = data.currentUser;
    if (this.router.url === '/coursesession-list/myCourses') {
      this.userService.getProfile(this.currentUser.id).subscribe((profile) => {
        this.userProfile = profile;
        this.courseSessionService.getMyCourseSessions(this.userProfile.student_group)
          .subscribe((response: any[]) => {
            this.courseSessions = response;
          });
      });
    } else {
      this.courseSessionService.getAllCourseSessions().subscribe((response: any) => {
        this.courseSessions = response;
      });
    }
  }


  deleteCourseSession(courseSession: any) {
    this.courseSessionService.deleteCourseSession(courseSession)
      .subscribe(() => {
        this.ngOnInit();
      });
  }


  openConfirmDialog(courseSessionId: number) {
    this.courseSessionService.getCourseSession(courseSessionId).subscribe((session: any) => {
      this.sessionPassword = session.password;
      this.sessionId = session.id;

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.id = 'attendance-confirm-component';
      dialogConfig.height = '350px';
      dialogConfig.width = '600px';
      dialogConfig.data = {
        title: 'Presence Confirmation',
        password: this.sessionPassword,
        sessionId: this.sessionId,
        userId: this.currentUser.id
      };
      const dialogRef = this.matDialog.open(AttendanceConfirmComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(
        (res) => {
        });
    });
  }

}
