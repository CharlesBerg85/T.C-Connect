import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FollowService } from "../../shared/services/follow.service";
import { size } from "lodash";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  @Input() user;        // a user who can be followed
  @Input() currentUser; // currently logged in user

  followerCount: number;
  isFollowing: boolean;

  followers;
  following;

  constructor(private followSvc: FollowService) { }

  ngOnInit() {
    const userId = this.user.$key
    const currentUserId = this.currentUser.uid


    // checks if the currently logged in user is following this.user
    this.following = this.followSvc.getFollowing(currentUserId, userId).snapshotChanges()
      .subscribe((following: any) => {

        this.isFollowing = following.$value

      })

    // retrieves the follower count for a user's profile
    this.followers = this.followSvc.getFollowers(userId).snapshotChanges()
      .subscribe((followers: any) => {

        this.followerCount = this.countFollowers(followers)

      })
  }


  private countFollowers(followers) {
    if (followers.$value === null) return 0
    else return size(followers)
  }


  toggleFollow() {
    const userId = this.user.$key
    const currentUserId = this.currentUser.uid

    if (this.isFollowing) this.followSvc.unfollow(currentUserId, userId)
    else this.followSvc.follow(currentUserId, userId)
  }


  ngOnDestroy() {
    this.followers.unsubscribe()
    this.following.unsubscribe()
  }
}