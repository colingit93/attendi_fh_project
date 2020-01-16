import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseService} from '../service/course.service';
import {CourseSessionService} from '../service/coursesession.service';
import {LocationService} from '../service/location.service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-coursesession-list',
  templateUrl: './coursesession-list.component.html',
  styleUrls: ['./coursesession-list.component.scss']
})
export class CoursesessionListComponent implements OnInit {

  coursesessions: any[];
  displayedColumns = ['location', 'mandatory', 'date', 'start_time', 'end_time', 'course', 'id'];

  constructor(private http: HttpClient, private courseSessionService: CourseSessionService, public locationService: LocationService, private userService: UserService) { }

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

}
