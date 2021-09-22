import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { MaterialModule } from 'src/app/material.module';
import { GetBibleApiService } from 'src/app/shared/services/get-bible-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  title = 'tc-connect';

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset)
  constructor(private breakpointObserver: BreakpointObserver,
              public authService: AuthService,
              public materialMod: MaterialModule,
              private api: GetBibleApiService) { }


  ngOnInit(): void {
    console.log("Dashboard")
    this.api.apiCall().subscribe((data) => {
      // console.warn("get api data", data);
      this.title = data["text"];
    })
  }
}
