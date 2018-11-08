import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { ReturnStatement } from '@angular/compiler';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' + localStorage.getItem('token'),
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL = environment.baseUrl + 'Users/';

  constructor(private _http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this._http.get<User[]>(this.BASE_URL + 'GetUsers');
  }

  getUserById(id): Observable<User> {
    return this._http.get<User>(this.BASE_URL + 'GetUserById/' + id);
  }

}
