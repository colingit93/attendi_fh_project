import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>, private userService: UserService,
    @Inject(MAT_DIALOG_DATA) private modalData: any,
  ) {
    console.log(this.modalData);
  }

  ngOnInit() {}

  actionFunction() {
    this.userService.logout();
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

}
