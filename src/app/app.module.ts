import { FindAlumniComponent } from './user/find-alumni/find-friends.component';
import { UserListItemComponent } from './user/user-list-item/user-list-item.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { NavbarComponent } from './components/nav-bar/navbar.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { PostsComponent } from './components/posts/posts.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';


import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { NgAisModule } from 'angular-instantsearch';

import { environment } from '../environments/environment';

import { AuthService } from "./shared/services/auth.service";
import { PostService } from './shared/services/post.service';
import { GetBibleApiService } from './shared/services/get-bible-api.service';
import { FriendsService } from './shared/services/friends.service';
import { ProfileService } from './shared/services/profile.service';
import { UserService } from './user/user.service';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from "@angular/cdk/scrolling"
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FollowService } from './shared/services/follow.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { MaterialModule } from './material.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';





@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    PostsComponent,
    AddPostComponent,
    NavbarComponent,
    FindAlumniComponent,
    UserProfileComponent,
    ProfileComponent,
    UserDetailComponent,
    UserListComponent,
    UserListItemComponent,
    UpdateUserComponent,
    
    

    ],
    
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ScrollingModule,
    LayoutModule,
    NoopAnimationsModule,
    NgAisModule, 
    MatDialogModule,
    InfiniteScrollModule
  ],

  providers: [AuthService,
              PostService,
              GetBibleApiService,
              FriendsService,
              ProfileService,
              FollowService,
              UserService,
            AngularFireStorage],

  bootstrap: [AppComponent],
  
})

export class AppModule { }
