import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  friendsCollection: AngularFirestoreCollection<User>;
  friends: Observable<User[]>;
  currentUser: User;


  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,) {
      
    this.friends = this.afs.collection('users').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        data.uid = a.payload.doc.id;
        return data;
      });
    }))
  }

  getFriends() {
    return this.friends;
  }

  
}




