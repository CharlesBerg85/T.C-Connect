import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireUploadTask } from 'angularfire2/storage';

import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { UrlHandlingStrategy } from '@angular/router';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  editing = true;
  user: User
  task: AngularFireUploadTask

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private storage: AngularFireStorage,
    private location: Location,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getUser()
  }


  getUser() {
    return this.auth.user.subscribe(user => (this.user = user))
  }

  updateProfile() {
    return this.userService.updateProfileData(
      this.user.firstName,
    )
  }

  updateEmail() {
    return this.userService.updateEmailData(this.user.email)
  }

  /*Sasync uploadPhotoURL(event): Promise<void> {
    const file = event.target.files[0]
    const path = `users/${this.user.uid}/photos/${file.name}`
    if (file.type.split('/')[0] !== 'image') {
      return alert('Only images allowed')
    } else {
      this.task = this.storage.upload(path, file)
      ;(await this.task).downloadURL().subscribe(url => {
        this.userService.updateProfileData(this.user.displayName, url)
      })
    }
  }*/

  updateUser() {
    const data = {
      firstName: this.user.firstName || null,
      lastName: this.user.lastName || null,
    }
    return this.userService.updateUserData(data)
  }

  goBack() {
    this.location.back()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open( UpdateUserDialogComponent, {

    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}