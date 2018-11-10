import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/Auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {

    constructor(private _userService: UserService, private _router: Router,
         private _alertify: AlertifyService , private _auth: AuthService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this._userService.getUserById(this._auth.decodenToken.nameid).pipe(
            catchError(err => {
                this._alertify.error(err);
                this._router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
