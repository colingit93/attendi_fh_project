import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {RoleService} from '../service/role.service';
import {StudentGroupService} from '../service/student-group.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class UserFormComponent implements OnInit {

  userFormGroup;
  profileFormGroup;
  maxDate = new Date();
  startDate = new Date(1990, 0, 1)

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute,
              private router: Router, private snackBar: MatSnackBar, public roleService: RoleService,
              public studentGroupService: StudentGroupService) {
  }

  ngOnInit() {
    const data = this.route.snapshot.data;

    this.userFormGroup = this.fb.group(
      {
        id: [null],
        username: ['', [Validators.required]],
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      });

    if (data.user) {
      this.userFormGroup.patchValue(data.user);
    }

    if (data.profile) {
      this.profileFormGroup = this.fb.group(
        {
          id: [data.user.id],
          user: [data.user.id],
          date_of_birth: [null],
          role: [''],
          student_group: [''],
          image: [[]],
        });
      this.profileFormGroup.patchValue(data.profile);
    }
  }

  createUser() {
    const user = this.userFormGroup.value;
    if (user.id) {
      this.userService.updateUser(user)
        .subscribe(() => {
          this.snackBar.open('User entry updated!', 'Dismiss',
            {
              duration: 3000
            });
        });
    } else {
      this.userService.createUser(user)
        .subscribe((response: any) => {
          this.router.navigate(['/user-form/' + response.id]);
          this.snackBar.open('User entry created!', 'Dismiss',
            {
              duration: 3000
            });
        });
    }
  }

  updateProfile() {
    const profile = this.profileFormGroup.value;
    this.userService.updateProfile(profile)
      .subscribe((response: any) => {
        this.snackBar.open('User Profile updated', 'Dismiss', {
          duration: 3000
        });
      });
  }

}
