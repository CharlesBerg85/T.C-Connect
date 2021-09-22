import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/shared/Interface/post';
import { map } from 'rxjs/operators';

import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  //properties within export class
  postCollection: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  postDoc: AngularFirestoreDocument<Post>;
  user: any;
  //injected Angular FS & Fa as dependencies to used within service 
  constructor(public afs: AngularFirestore,
              private auth: AngularFireAuth,) {

  //gives authentication so user may post with their UID
      this.auth.authState.subscribe(res => {
        if (res && res.uid) {
          this.user = res;
        } else {
          console.log("User is not logged in")
        }
      })

      
    //setting collection to posts collection
    this.postCollection = this.afs.collection('posts');
    
    //observable post is being set to posts collection  
    this.posts = this.postCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Post;
        data.uid = a.payload.doc.id;
        return data;
      });
    }))
  }


  getPosts() {
    return this.posts;
  }

  addPost(post: Post){
    this.postCollection.add(post);
  }

  deletePost(post: Post){
    this.postDoc = this.afs.doc(`posts/${post.uid}`)
    this.postDoc.delete();
  }

  updatePost(post: Post){
    this.postDoc = this.afs.doc(`posts/${post.uid}`)
    this.postDoc.update(post);
  }

}

