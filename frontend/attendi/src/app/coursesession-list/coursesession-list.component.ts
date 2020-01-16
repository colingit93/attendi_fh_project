import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseService} from '../service/course.service';
import {CourseSessionService} from '../service/coursesession.service';
import {LocationService} from '../service/location.service';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-coursesession-list',
  templateUrl: './coursesession-list.component.html',
  styleUrls: ['./coursesession-list.component.scss']
})
export class CoursesessionListComponent implements OnInit {

  courseSessions: any[];
  displayedColumns = ['location', 'mandatory', 'date', 'start_time', 'end_time', 'course', 'student_group', 'id'];
  currentUserId: any;
  userProfile: any;

  constructor(private http: HttpClient, private courseSessionService: CourseSessionService, public locationService: LocationService,
              private userService: UserService, private router: Router) {
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

}
