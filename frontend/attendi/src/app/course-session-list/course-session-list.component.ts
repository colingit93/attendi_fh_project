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
  selector: 'app-course-session-list',
  templateUrl: './course-session-list.component.html',
  styleUrls: ['./course-session-list.component.scss']
})
export class CourseSessionListComponent implements OnInit {
  courseId: any;
  courseSessions: any[];
  user: any;
  displayedColumns = ['location', 'mandatory', 'date', 'start_time', 'end_time', 'course', 'student_group', 'id'];

  constructor(private http: HttpClient, private courseSessionService: CourseSessionService, public locationService: LocationService,
              private userService: UserService, private router: Router, private matDialog: MatDialog, private route: ActivatedRoute,
              private attendanceItemService: AttendanceItemService) {
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    const course = data.course;
    this.courseSessionService.getCourseSessions(course.id).subscribe((res: any[]) => {
      this.courseSessions = res;
    });
  }

  deleteCourseSession(courseSession: any) {
    this.courseSessionService.deleteCourseSession(courseSession)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  getAttendanceList() {

  }

}
