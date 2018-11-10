import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../services/alertify.service';
import { AuthService } from '../../services/Auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('userForm') userForm: NgForm;
  user: User;


  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.userForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private _route: ActivatedRoute, private _http: UserService,
    private alertify: AlertifyService, private auth: AuthService) { }

  ngOnInit() {
    this._route.data.subscribe(data => this.user = data['user']);
  }

  updateUserInfo() {
    this._http.updateUser(this.auth.decodenToken.nameid, this.user).subscribe(data => {
      this.alertify.success('success!');
      this.userForm.reset(this.user);
      console.log(this.user);
    },
      err => {
        this.alertify.error('something went wrong!');
      }
    );
  }

  updateProfilePhoto(url) {
    this.user.photoUrl = url;
  }
}
