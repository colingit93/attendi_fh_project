import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseSessionService} from '../service/coursesession.service';
import {LocationService} from '../service/location.service';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AttendanceConfirmComponent} from '../attendance-confirm/attendance-confirm.component';


@Component({
  selector: 'app-coursesession-list',
  templateUrl: './coursesession-list.component.html',
  styleUrls: ['./coursesession-list.component.scss']
})
export class CoursesessionListComponent implements OnInit {



  currentUserId: any;
  userProfile: any;
  courseSessions: any[];
  user: any;
  code: any;
  displayedColumns = ['location', 'mandatory', 'date', 'start_time', 'end_time', 'course', 'student_group', 'password', 'id'];

  constructor(private http: HttpClient, private courseSessionService: CourseSessionService, public locationService: LocationService,
              private userService: UserService, private router: Router, private matDialog: MatDialog) {
  }

  ngOnInit() {
    if (this.router.url === '/coursesession-list/myCourses') {
      this.userService.findByName(localStorage.getItem('username')).subscribe((user: any) => {
        this.currentUserId = user.id;
        this.userService.getProfile(this.currentUserId).subscribe((profile) => {
          this.userProfile = profile;
          this.courseSessionService.getMyCourseSessions(this.userProfile.student_group)
            .subscribe((response: any[]) => {
              this.courseSessions = response;
            });
        });
      });
    } else {
      this.courseSessionService.getAllCourseSessions().subscribe((response: any) => {
        this.courseSessions = response;
      });
    }
  }


  deleteCourseSession(coursesessions: any) {
    this.courseSessionService.deleteCourseSession(coursesessions)
      .subscribe(() => {
        this.ngOnInit();
      });
  }



  openConfirmDialog() {
    // const userId = 'user01';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.id = 'attendance-confirm-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    dialogConfig.data = {
      id: 1,
      name: 'confirm',
      title: 'Presence Confirmation',
      // code: 'Please enter passphrase',
      actionButtonText: 'Confirm',
      // userId
    };

    const dialogRef = this.matDialog.open(AttendanceConfirmComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        this.code = data;
        alert(JSON.stringify(this.code));
        /*if (this.code === passw) {
          // console.log(this.code);
          alert(JSON.stringify(passw));
        } else {
          alert(JSON.stringify(this.code));
        }*/
      }
    );
  }

}
