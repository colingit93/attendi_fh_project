import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {RoleService} from '../service/role.service';
import {StudentGroupService} from '../service/student-group.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userFormGroup;
  profileFormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute,
              private router: Router, private snackBar: MatSnackBar, public roleService: RoleService,
              public studentGroupService: StudentGroupService) {
  }

  ngOnInit() {
    const data = this.route.snapshot.data;

    this.userFormGroup = this.fb.group(
      {
        username: ['', [Validators.required]],
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      });

    if (data.user) {
      this.userFormGroup.patchValue(data.user);
    }

    this.profileFormGroup = this.fb.group(
      {
        role: [''],
        student_group: [''],
        image: [null],
      });

    if (data.profile) {
      this.profileFormGroup.patchValue(data.profile);
    }
  }

  createUser() {
    const user = this.userFormGroup.value;
    if (user.id) {
      this.userService.updateUser(user)
        .subscribe(() => {
          this.router.navigate(['/user-list']);
          this.snackBar.open('User entry updated!', 'Dismiss',
            {
              duration: 3000
            });
        });
    } else {
      this.userService.createUser(user)
        .subscribe((response: any) => {
          this.router.navigate(['/user-list/']);
          this.snackBar.open('User entry created!', 'Dismiss',
            {
              duration: 3000
            });
        });
    }
  }

}
