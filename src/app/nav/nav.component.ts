import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(public _auth: AuthService, private alertify: AlertifyService, private _router: Router) { }

  ngOnInit() {
  }

  login() {
    this._auth.login(this.model).subscribe(data => {
      this.alertify.success('success!');
    },
      err => {
        if (err.description) {
          this.alertify.error(err.description);
        } else {
          this.alertify.error(err);
        }

      },
      () => this._router.navigate(['/members'])
    );
  }

  loggedIn() {
    return this._auth.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._auth.decodenToken = null;
    this._auth.currentUser = null;
    this.alertify.success('Good bye !');
    this._router.navigate(['/home']);
  }

}
