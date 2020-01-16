import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseService} from '../service/course.service';
import {CourseSessionService} from '../service/coursesession.service';
import {LocationService} from '../service/location.service';
import {UserService} from '../service/user.service';
import {StudentGroupService} from '../service/student-group.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AttendanceConfirmComponent} from '../attendance-confirm/attendance-confirm.component';

@Component({
  selector: 'app-coursesession-list',
  templateUrl: './coursesession-list.component.html',
  styleUrls: ['./coursesession-list.component.scss']
})
export class CoursesessionListComponent implements OnInit {

  coursesessions: any[];
  user: any;
  code: any;
  displayedColumns = ['location', 'studentgroup', 'mandatory', 'date', 'start_time', 'end_time', 'course', 'password', 'id'];

  constructor(private http: HttpClient, public matDialog: MatDialog, private courseSessionService: CourseSessionService, public locationService: LocationService, private userService: UserService, public groupService: StudentGroupService) { }

  ngOnInit() {
    this.courseSessionService.getCourseSessions()
      .subscribe((response: any[]) => {
        this.coursesessions = response;
      });
  }


  deleteCourseSession(coursesessions: any) {
    this.courseSessionService.deleteCourseSession(coursesessions)
      .subscribe(() => {
        this.ngOnInit();
      });
  }



  openConfirmDialog(coursesessions: any) {
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
