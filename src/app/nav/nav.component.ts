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
        console.log(err);
      },
      () => this._router.navigate(['/members'])
    );
  }

  loggedIn() {
    return this._auth.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.success('Good bye !');
    this._router.navigate(['/home']);
  }

}
