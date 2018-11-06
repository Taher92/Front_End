import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/Auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  Jwthelper = new JwtHelperService();
  title = 'DatingApp-SPA';

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this._auth.decodenToken = this.Jwthelper.decodeToken(token);
    }
  }
}
