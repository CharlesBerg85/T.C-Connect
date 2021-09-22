import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { AuthService  } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public Materialmodule: MaterialModule
  
  ) { }

  ngOnInit(): void {
  }

}
