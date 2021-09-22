import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/services/post.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Post } from 'src/app/shared/Interface/post';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  editState: boolean = false;
  postToEdit: Post;


  constructor(public router: Router,
              public authService: AuthService,
              private postService: PostService,) { }
    //fetching the posts through the service using get getPosts
  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      //when we get posts from observable we want to set them to the posts property  
      this.posts = posts;
    });
  }

  deletePost(event, post: Post){
    this.clearState();
    this.postService.deletePost(post);
  }

  editPost(event, post: Post){
    this.editState = true;
    this.postToEdit = post;

  }

  updatePost(post: Post){
    this.postService.updatePost(post);
    this.clearState();
  }

  clearState(){
    this.editState = false;
    this.postToEdit = null;
  }

}
