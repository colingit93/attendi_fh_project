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
import {UserService} from '../service/user.service';
import {StudentGroupService} from '../service/student-group.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AttendanceConfirmComponent} from '../attendance-confirm/attendance-confirm.component';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-coursesession-form',
  templateUrl: './coursesession-form.component.html',
  styleUrls: ['./coursesession-form.component.scss']
})
export class CoursesessionFormComponent implements OnInit {

  coursesessionFormGroup;
  courseOptions;
  minDate = new Date();


  constructor(private fb: FormBuilder, private courseSessionService: CourseSessionService, public locationService: LocationService,
              private route: ActivatedRoute, private router: Router, private userService: UserService,
              public studentGroupService: StudentGroupService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    const data = this.route.snapshot.data;
    this.courseOptions = data.courseOptions;

    this.coursesessionFormGroup = this.fb.group({
      id: [null],
      location: ['', [Validators.required]],
      mandatory: [true],
      date: ['', [Validators.required]],
      start_time: ['', [Validators.required]],
      end_time: ['', [Validators.required]],
      course: ['', [Validators.required]],
      student_group: ['', [Validators.required]],
      password: ['', [Validators.required]]
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
          this.router.navigate(['/attendance-list/']);
          this.snackBar.open('Session entry updated!', 'Dismiss',
            {
              duration: 3000
            });
        });
    } else {
      this.courseSessionService.createCourseSession(coursesession)
        .subscribe((response: any) => {
          this.router.navigate(['/attendance-list/']);
          this.snackBar.open('Session entry created!', 'Dismiss',
            {
              duration: 3000
            });
        });
    }
  }


}
