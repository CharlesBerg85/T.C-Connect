import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/Interface/post';
import { PostService } from 'src/app/shared/services/post.service';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  //property of post set to an object with an empty message
  post: Post = {
    message: ''
  }
  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }


  postMessage(){
    if(this.post.message != ''){
      this.postService.addPost(this.post);
      //clearing field
      this.post.message = '';
    }
  }
}



