import { FindAlumniComponent } from '../find-alumni/find-friends.component';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  [x: string]: any;

  users: Observable<any[]>

  constructor(private userService: UserService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users = this.userService.getUsers();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FindAlumniComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }


}
