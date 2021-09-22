import { Profile } from '../Interface/profile';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profileCollection: AngularFirestoreCollection<Profile>;
  profile: Observable<Profile[]>;
  profileDoc: AngularFirestoreDocument<Profile>;

  constructor(public afs: AngularFirestore,) {

    this.profileCollection = this.afs.collection('profiles');

    this.profile = this.profileCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Profile;
        data.uid = a.payload.doc.id;
        return data;
      });
    }))
  }

  getProfile() {
    return this.profile;
  }

  addProfile(profile: Profile){
    this.profileCollection.add(profile);
  }

  updateProfile(profile: Profile){
    this.profileDoc = this.afs.doc(`profiles/${profile.uid}`)
    this.profileDoc.update(profile);
  }
}
