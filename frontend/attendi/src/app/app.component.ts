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

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.userService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
}
