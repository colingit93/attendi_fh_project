import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CourseService} from '../service/course.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  courseFormGroup;
  coursesessionOptions;
  userOptions;

  constructor(private fb: FormBuilder, private courseService: CourseService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    const data = this.route.snapshot.data;
    this.coursesessionOptions = data.coursesessionOptions;
    this.userOptions = data.userOptions;

    this.courseFormGroup = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      description: [null],
      session: [[]],
      students: [[]],
      lecturer: [[]],
    });

    if (data.course) {
      this.courseFormGroup.patchValue(data.course);
    }
  }


  createCourse() {
    const course = this.courseFormGroup.value;
    if (course.id) {
      this.courseService.updateCourse(course)
        .subscribe(() => {
          alert('updated successfully');
        });
    } else {
      this.courseService.createCourse(course)
        .subscribe((response: any) => {
          this.router.navigate(['/course-form/' + response.id]);
        });
    }
  }

}
