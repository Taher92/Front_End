import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TokenResponse } from '../Models/Token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = 'https://localhost:44340/api/account/';

  constructor(private _http: HttpClient) { }

  login(model: any) {
    return this._http.post(this.BASE_URL + 'Login', model)
      .pipe(
        map((res: any) => {
          localStorage.setItem('token', res.token);
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
}
