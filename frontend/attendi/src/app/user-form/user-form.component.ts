import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {StudentGroupService} from '../service/student-group.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {HttpClient} from '@angular/common/http';
import {GroupService} from '../service/group.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: []
})
export class UserFormComponent implements OnInit {

  userFormGroup;
  profileFormGroup;
  maxDate = new Date();
  startDate = new Date(1990, 0, 1);
  selectedImage: File = null;
  groupOptions;
  currentImage = 'No Image';

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute,
              private router: Router, private snackBar: MatSnackBar, public groupService: GroupService,
              public studentGroupService: StudentGroupService, private http: HttpClient) {
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    this.groupOptions = data.groupOptions;
    if (data.profile && data.profile.image) {
      this.userService.getProfileImage(data.profile.image).subscribe((res: any) => {
        this.currentImage = res.file_name;
      });
    }

    this.userFormGroup = this.fb.group(
      {
        id: [null],
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^[A-Za-z]+$/)]],
        first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[A-Za-z]+$/)]],
        last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[A-Za-z]+$/)]],
        email: ['', [Validators.required, this.emailValidator]],
        groups: [[], [Validators.required]],
        password: ['', [Validators.required]]
      });

    if (data.user) {
      const user = data.user;
      user.password = 'noChange';
      this.userFormGroup.patchValue(user);
      this.userFormGroup.controls.groups.patchValue(user.groups[0]);
    }

    if (data.profile) {
      this.profileFormGroup = this.fb.group(
        {
          id: [data.user.id],
          user: [data.user.id],
          date_of_birth: [null, [Validators.required]],
          student_group: ['', [Validators.required]],
          image: [[], ]
        });
      this.profileFormGroup.patchValue(data.profile);
    }
  }

  createUser() {
    this.userFormGroup.controls.groups.patchValue([this.userFormGroup.controls.groups.value]);
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
        this.router.navigate(['/user-list/']);
        this.snackBar.open('User Profile updated', 'Dismiss', {
          duration: 3000
        });
      });
  }

  onFileSelected(event) {
    this.selectedImage = event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append('file', this.selectedImage, this.selectedImage.name);
    fd.append('content_type', this.selectedImage.type);
    this.http.post('/api/media', fd)
      .subscribe((response: any) => {
        this.profileFormGroup.controls.image.setValue(response.id);
      });
  }

  emailValidator(mail): any {
    if (mail.pristine) {
      return null;
    }
    const MAIL_REGEXP = /^[_A-Za-z0-9-\\+]+(\.[_A-Za-z0-9-]+)*@edu.fh-joanneum.at$/.test(mail.value);
    if (MAIL_REGEXP) {
      return null;
    }
    return {
      invalidMail: true
    };
  }

}


