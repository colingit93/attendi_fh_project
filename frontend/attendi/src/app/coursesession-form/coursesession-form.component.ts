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


@Component({
  selector: 'app-coursesession-form',
  templateUrl: './coursesession-form.component.html',
  styleUrls: ['./coursesession-form.component.scss']
})
export class CoursesessionFormComponent implements OnInit {

  coursesessionFormGroup;
  courseOptions;

  constructor(private fb: FormBuilder, private courseSessionService: CourseSessionService, public locationService: LocationService, public groupService: StudentGroupService,
              private route: ActivatedRoute, private router: Router, private userService: UserService) {
  }

  ngOnInit() {

    const data = this.route.snapshot.data;
    this.courseOptions = data.courseOptions;

    this.coursesessionFormGroup = this.fb.group({
      id: [null],
      location: ['', [Validators.required]],
      studentgroup: ['', [Validators.required]],
      mandatory: [true],
      date: [],
      start_time: [],
      end_time: [],
      course: [],
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
