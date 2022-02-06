import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public apiservice: ApiServiceService, public _auth: AuthService,
    private _route: Router,) { }

  ngOnInit(): void {
    this._auth.checkUserAuth();
  }
  signOut() {
    this._route.navigateByUrl('home');
    window.scrollTo(0, 0);
    this._auth.signOut();
   
  }
}
