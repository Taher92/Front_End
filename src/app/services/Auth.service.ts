import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = 'https://localhost:44340/api/account/';
  Jwthelper = new JwtHelperService();
  decodenToken: any;

  constructor(private _http: HttpClient) { }

  login(model: any) {
    return this._http.post(this.BASE_URL + 'Login', model)
      .pipe(
        map((res: any) => {
          localStorage.setItem('token', res.token);
          this.decodenToken = this.Jwthelper.decodeToken(res.token);
          console.log(this.decodenToken);
        }
        )
      );
  }

  register(model: any) {
    return this._http.post(this.BASE_URL + 'register', model)
      .pipe(
        map((res: any) => {
        }
        ));
  }



  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.Jwthelper.isTokenExpired(token);
  }
}
