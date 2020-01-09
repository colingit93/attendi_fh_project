import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseService} from '../service/course.service';
import {CourseSessionService} from '../service/coursesession.service';
import {LocationService} from '../service/location.service';

@Component({
  selector: 'app-coursesession-list',
  templateUrl: './coursesession-list.component.html',
  styleUrls: ['./coursesession-list.component.scss']
})
export class CoursesessionListComponent implements OnInit {

  coursesessions: any[];
  displayedColumns = ['id', 'location', 'mandatory', 'date', 'start_time', 'end_time', 'course'];

  constructor(private http: HttpClient, private courseSessionService: CourseSessionService, public locationService: LocationService) { }

  ngOnInit() {
    this.courseSessionService.getCourseSessions()
      .subscribe((response: any[]) => {
        this.coursesessions = response;
      });
  }

  deleteCourse(coursesessions: any) {
    this.courseSessionService.deleteCourseSession(coursesessions)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

}
