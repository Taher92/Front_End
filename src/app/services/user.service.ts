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

  updateUser(id: string, user: User) {
    return this._http.put(this.BASE_URL + 'UpdateUserDetails/' + id, user);
  }

  deleteUserPhoto(id, photoId) {
    return this._http.post(this.BASE_URL + id + '/photos/DeletePhoto/' + photoId, {});
  }

  setPhotoAsMain(id, photoId) {
    return this._http.post(this.BASE_URL + id + '/photos/SetPhotAsMain/' + photoId, {});
  }

}
