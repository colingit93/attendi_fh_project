import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogConfirmComponent} from '../dialog-confirm/dialog-confirm.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService, public matDialog: MatDialog) {
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }


  openLogoutModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'dialog-confirm-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    dialogConfig.data = {
      name: 'logout',
      title: 'Are you sure you want to logout?',
      description: 'Pretend this is a convincing argument on why you shouldn\'t logout :)',
      actionButtonText: 'Logout',
    };

    const modalDialog = this.matDialog.open(DialogConfirmComponent, dialogConfig);
  }

}
