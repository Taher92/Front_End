import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/Auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  Jwthelper = new JwtHelperService();
  title = 'DatingApp-SPA';
  user: User;
  constructor(private _auth: AuthService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this._auth.decodenToken = this.Jwthelper.decodeToken(token);
    }
    if (this.user) {
      this._auth.currentUser = this.user;
    }
  }
}
