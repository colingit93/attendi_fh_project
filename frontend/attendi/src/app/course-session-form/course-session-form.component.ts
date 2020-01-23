import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder, FormGroup,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseSessionService} from '../service/coursesession.service';
import {LocationService} from '../service/location.service';
import {UserService} from '../service/user.service';
import {StudentGroupService} from '../service/student-group.service';
import {MatSnackBar} from '@angular/material';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogConfirmComponent} from '../dialog-confirm/dialog-confirm.component';



@Component({
  selector: 'app-course-session-form',
  templateUrl: './course-session-form.component.html',
  styleUrls: ['./course-session-form.component.scss']
})
export class CourseSessionFormComponent implements OnInit {


  constructor(private fb: FormBuilder, private courseSessionService: CourseSessionService, public locationService: LocationService,
              private route: ActivatedRoute, private router: Router, private userService: UserService,
              public studentGroupService: StudentGroupService, private snackBar: MatSnackBar, public matDialog: MatDialog) {
  }

  courseSessionFormGroup;
  courseOptions;
  minDate = new Date();

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
    }, {validator: this.timeLessThan('start_time', 'end_time')
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
          this.router.navigate(['/course-session-list/']);
          this.snackBar.open('Session entry updated!', 'Dismiss',
            {
              duration: 3000
            });
        });
    } else {
      this.courseSessionService.createCourseSession(courseSession)
        .subscribe((response: any) => {
          this.router.navigate(['/course-session-list/']);
          this.snackBar.open('Session entry created!', 'Dismiss',
            {
              duration: 3000
            });
        });
    }
  }


  timeLessThan(start: string, end: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const startTime = group.controls[start];
      const endTime = group.controls[end];
      if ( (endTime.value && startTime.value) && startTime.value > endTime.value) {
        return this.snackBar.open('Endtime must be greater then Starttime!', 'Dismiss',
          {
            duration: 3000
          });
      } else {
        return null;
      }
    };
  }

}
