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
import {CourseSessionService} from '../service/coursesession.service';
import {LocationService} from '../service/location.service';


@Component({
  selector: 'app-coursesession-form',
  templateUrl: './coursesession-form.component.html',
  styleUrls: ['./coursesession-form.component.scss']
})
export class CoursesessionFormComponent implements OnInit {

  coursesessionFormGroup;
  courseOptions;

  constructor(private fb: FormBuilder, private courseSessionService: CourseSessionService, public locationService: LocationService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    const data = this.route.snapshot.data;
    this.courseOptions = data.courseOptions;

    this.coursesessionFormGroup = this.fb.group({
      id: [null],
      location: ['', [Validators.required]],
      mandatory: [true],
      date: [],
      start_time: [],
      end_time: [],
      course: [],
    });
    if (data.coursesession) {
      this.coursesessionFormGroup.patchValue(data.coursesession);
    }
  }


  createCourseSession() {
    const coursesession = this.coursesessionFormGroup.value;
    if (coursesession.id) {
      this.courseSessionService.updateCourseSession(coursesession)
        .subscribe(() => {
          alert('updated successfully');
        });
    } else {
      this.courseSessionService.createCourseSession(coursesession)
        .subscribe((response: any) => {
          this.router.navigate(['/coursesession-form/' + response.id]);
        });
    }
  }

}
