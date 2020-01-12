import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../service/user.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: any[];
  displayedColumns = ['full_name', 'username', 'id'];

  constructor(private http: HttpClient, private userService: UserService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.userService.getUserList()
      .subscribe((response: any[]) => {
        this.users = response;
      });
  }

  deleteUser(user: any) {
    this.userService.deleteUser(user)
      .subscribe(() => {
        this.ngOnInit();
        this.snackBar.open('User was deleted!', 'Dismiss',
          {
            duration: 3000
          });
      });
  }

}
