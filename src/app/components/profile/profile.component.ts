import { Component, OnInit } from '@angular/core';
import { FollowService } from 'src/app/shared/services/follow.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    currentUser;
    user;

  constructor(private followSvc: FollowService) { }

  ngOnInit(): void {
  }

}
