import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseService} from '../service/course.service';
import {UserService} from '../service/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  courses: any[];
  displayedColumns = ['name', 'description', 'students', 'lecturer', 'id'];

  constructor(private http: HttpClient, private courseService: CourseService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    const data = this.route.snapshot.data;
    const user = data.currentUser;
    this.courseService.getUserCourses(user.id)
      .subscribe((response: any[]) => {
        this.courses = response;
      });
  }

  deleteCourse(course: any) {
    this.courseService.deleteCourse(course)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

}
