import { Injectable, NgZone } from '@angular/core';
import { User } from '../Interface/user';
import firebase from 'firebase/app';
import "firebase/auth";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _userData: Observable<firebase.User>;
  private currentUser: User;
  private currentUser$ = new BehaviorSubject<User>(null);
  authState: any = null;
  userData: any; // Save logged in user data
  user: Observable<User>
  userDoc: AngularFirestoreDocument<unknown>;

  constructor(public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public firebase: AngularFireAuth,) {

    /* Saving user data in local storage when
    logged in and setting up null when logged out*/ 
    this.afAuth.authState.subscribe(user => {
     
      if (user) {
        this.userData = user;
        this.currentUser$.next(user)
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
         this.router.navigate(['dashboard']);
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })

   /* this.user = this.afAuth.authState.subscribe(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    })

    this.afAuth.authState.subscribe(data => this.authState = data)
  }*/



  }


  CurrentUser(): Observable<User> {
    return this.currentUser$.asObservable();
  }

  GetUserByUID() {
    this.afAuth.user.subscribe(user => this.userDoc = this.afs.doc(`users/${ user.uid}`));
    this.user = this.userDoc.valueChanges();
    console.log(this.user);
  }

  // Sign up with email/password
  async SignUp(firstName: string,
    lastName: string,
    email: string,
    password: string,) {
    this.afAuth.createUserWithEmailAndPassword(email, password).then(result => {
      const newUser: User = {
        firstName,
        lastName,
        email,
        uid: result.user.uid
      };
      this.SetUserData(newUser);
    });
  }

  /* Setting up user data when sign in with username/password,
sign up with username/password and sign in with social auth
provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      firstName: user.firstName,
      lastName: user.lastName,
      uid: user.uid,
      email: user.email,
    }
    return userRef.set(userData, {
      merge: true
    })
  }
  // Sign in with email/password
  async SignIn(email: string, password: string) {
    try {
      const result = await this.firebase.signInWithEmailAndPassword(email, password);

      this.SetUserData(result.user);
    } catch (error) {
      window.alert(error.message);
    }
  }

  // Sign out
  SignOut() {
    return this.firebase.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }


  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }



  // Send email verificaiton when new user sign up
  async SendVerificationMail() {
    return (await this.firebase.currentUser).sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
  }

  // Reset Forgot password
  async ForgotPassword(passwordResetEmail) {
    try {
      await this.firebase.sendPasswordResetEmail(passwordResetEmail);
      window.alert('Password reset email sent, check your inbox.');
    } catch (error) {
      window.alert(error);
    }
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }


  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.firebase.signInWithPopup(provider)
      .then((result) => {
        console.log(result)
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error)
      })
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : null;
  }


}

