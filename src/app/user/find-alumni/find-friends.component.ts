import { Component, OnInit } from '@angular/core';
import { FriendsService } from 'src/app/shared/services/friends.service';
import { User } from 'src/app/shared/Interface/User';
import { AngularFirestore } from '@angular/fire/firestore';
import algoliasearch from 'algoliasearch/lite';
import { MatDialog } from '@angular/material/dialog';

const searchClient = algoliasearch(
  '6TV6NZMSZK',
  'fd04ea138cfc0d06865a13214815c2f6'
);




@Component({
  selector: 'app-find-friends',
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.css']
})

export class FindAlumniComponent implements OnInit {
  config = {
    indexName: 'users',
    searchClient
  };

  friends: User[] = [];


  constructor(private friendService: FriendsService,
              private afs: AngularFirestore,
              public dialog: MatDialog
  ) { }

  ngOnInit(): void {



    this.friendService.getFriends().subscribe(friends => {
      console.log("this works");
      this.friends = friends;
    })
  }

  


}


