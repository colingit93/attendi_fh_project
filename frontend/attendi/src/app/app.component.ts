import {Component, OnInit} from '@angular/core';
import {UserService} from './service/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'attendi';
  isLoggedIn = false;
  isAdmin = false;

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  currentUserId: any;
  studentGroup: any;


  ngOnInit() {
    this.userService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    if (this.userService.hasPermission('auth.delete_user')) {
      this.isAdmin = true;
    }

  }
}
