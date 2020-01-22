import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseService} from '../service/course.service';
import {UserService} from '../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';



@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})

export class CourseListComponent implements OnInit {

  courses: MatTableDataSource<any>;
  displayedColumns = ['name', 'description', 'students', 'lecturer', 'id'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private http: HttpClient, private courseService: CourseService, private userService: UserService, private route: ActivatedRoute) { }


  ngOnInit() {
    const data = this.route.snapshot.data;
    const user = data.currentUser;
    this.courseService.getUserCourses(user.id)
      .subscribe((response: any[]) => {
        this.courses = new MatTableDataSource(response);
        this.courses.sort = this.sort;
      });
  }

  deleteCourse(course: any) {
    this.courseService.deleteCourse(course)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  applyFilter(value: string) {
    this.courses.filter = value.trim().toLowerCase();
  }



}
