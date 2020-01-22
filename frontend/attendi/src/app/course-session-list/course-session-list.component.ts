import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseSessionService} from '../service/coursesession.service';
import {LocationService} from '../service/location.service';
import {UserService} from '../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-course-session-list',
  templateUrl: './course-session-list.component.html',
  styleUrls: ['./course-session-list.component.scss']
})
export class CourseSessionListComponent implements OnInit {
  courseSessions: MatTableDataSource<any>;
  user: any;
  displayedColumns = ['location', 'mandatory', 'date', 'start_time', 'end_time', 'course_name', 'student_group', 'id'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private http: HttpClient, private courseSessionService: CourseSessionService, public locationService: LocationService,
              private userService: UserService, private router: Router, private matDialog: MatDialog, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    if (data.course) {
      const course = data.course;
      this.courseSessionService.getCourseSessions(course.id).subscribe((res: any[]) => {
        this.courseSessions = new MatTableDataSource(res);
        this.courseSessions.sort = this.sort;
      });
    } else {
      this.courseSessionService.getAllCourseSessions().subscribe((res: any[]) => {
        this.courseSessions = new MatTableDataSource(res);
        this.courseSessions.sort = this.sort;
      });
    }
  }

  deleteCourseSession(courseSession: any) {
    this.courseSessionService.deleteCourseSession(courseSession)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  applyFilter(value: string) {
    this.courseSessions.filter = value.trim().toLowerCase();
  }

}
