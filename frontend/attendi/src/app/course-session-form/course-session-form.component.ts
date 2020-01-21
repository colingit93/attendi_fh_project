import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseSessionService} from '../service/coursesession.service';
import {LocationService} from '../service/location.service';
import {UserService} from '../service/user.service';
import {StudentGroupService} from '../service/student-group.service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-course-session-form',
  templateUrl: './course-session-form.component.html',
  styleUrls: ['./course-session-form.component.scss']
})
export class CourseSessionFormComponent implements OnInit {

  courseSessionFormGroup;
  courseOptions;
  minDate = new Date();


  constructor(private fb: FormBuilder, private courseSessionService: CourseSessionService, public locationService: LocationService,
              private route: ActivatedRoute, private router: Router, private userService: UserService,
              public studentGroupService: StudentGroupService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    const data = this.route.snapshot.data;
    this.courseOptions = data.courseOptions;

    this.courseSessionFormGroup = this.fb.group({
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
    if (data.courseSession) {
      this.courseSessionFormGroup.patchValue(data.courseSession);
      const startTime = data.courseSession.start_time.slice(0, 5);
      const endTime = data.courseSession.end_time.slice(0, 5);
      this.courseSessionFormGroup.controls.start_time.patchValue(startTime);
      this.courseSessionFormGroup.controls.end_time.patchValue(endTime);
    }
  }

  createCourseSession() {
    const courseSession = this.courseSessionFormGroup.value;
    if (courseSession.id) {
      this.courseSessionService.updateCourseSession(courseSession)
        .subscribe(() => {
          this.router.navigate(['/attendance-list/']);
          this.snackBar.open('Session entry updated!', 'Dismiss',
            {
              duration: 3000
            });
        });
    } else {
      this.courseSessionService.createCourseSession(courseSession)
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