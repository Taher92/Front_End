import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';
import { AlertifyService } from '../services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService, private _router: Router, private _alertify: AlertifyService) { }

  canActivate(): boolean {
    if (this._auth.loggedIn()) {
      return true;
    }
    this._alertify.error('please log in first');
    this._router.navigate(['/home']);
    return false;
  }
}
