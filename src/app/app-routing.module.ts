import { FindAlumniComponent } from './user/find-alumni/find-friends.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component'; 
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserListItemComponent } from './user/user-list-item/user-list-item.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';



const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent, /*canActivate: [AuthGuard]*/},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: "aboutMe", component: UpdateUserComponent},
  { path: "findFriends", component: FindAlumniComponent},
  { path: "profile", component: ProfileComponent },
  { path: 'users', component: UserListComponent},
  { path: 'users/:id', component: UserDetailComponent},
  { path: 'test', component: UserListItemComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }