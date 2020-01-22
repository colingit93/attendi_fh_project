import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../service/user.service';
import {MatSnackBar} from '@angular/material';
import {StudentGroupService} from '../service/student-group.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: MatTableDataSource<any>;
  displayedColumns = ['image', 'full_name', 'username', 'student_group', 'id'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private http: HttpClient, private userService: UserService, private snackBar: MatSnackBar,
              public studentGroupService: StudentGroupService) {
  }

  ngOnInit() {
    this.userService.getUserList()
      .subscribe((response: any[]) => {
        this.users = new MatTableDataSource(response);
        this.users.sort = this.sort;
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

  applyFilter(value: string) {
    this.users.filter = value.trim().toLowerCase();
  }

}
