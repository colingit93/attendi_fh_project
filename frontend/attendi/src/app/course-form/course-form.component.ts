import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder, ValidationErrors,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../service/course.service';
import {UserService} from '../service/user.service';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  courseFormGroup;
  userOptions;

  constructor(private fb: FormBuilder, private courseService: CourseService, private route: ActivatedRoute,
              private userService: UserService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    const data = this.route.snapshot.data;
    this.userOptions = data.userOptions;

    this.courseFormGroup = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[A-Za-z0-9\s]*$/)], this.nameValidator()],
      description: ['', [Validators.minLength(10), Validators.maxLength(400)]],
      students: [[], Validators.required],
      lecturer: [[], Validators.required],
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
          this.router.navigate(['/course-list/']);
          this.snackBar.open('Course entry updated!', 'Dismiss',
            {
              duration: 3000
            });
        });
    } else {
      this.courseService.createCourse(course)
        .subscribe((response: any) => {
          this.router.navigate(['/course-list/']);
          this.snackBar.open('Course entry created!', 'Dismiss',
            {
              duration: 3000
            });
        });
    }
  }


  nameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.courseService.getCourses()
        .pipe(
          map((courses: any[]) => {
            const currentId = this.courseFormGroup.controls.id.value;
            const currentName = this.courseFormGroup.controls.name.value;
            const courseWithSameName = courses.find((m) => {
              return (currentId || m.id !== currentId) && m.name === currentName;
            });
            if (courseWithSameName) {
              return {
                nameAlreadyExists: true
              };
            } else {
              return null;
            }
          })
        );
    };
  }

}
