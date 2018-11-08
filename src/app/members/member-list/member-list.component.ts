import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../_models/user';
import { AlertifyService } from '../../services/alertify.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  Users: User[];

  constructor(private _usersService: UserService, private _alertify: AlertifyService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.Users = data['users'];
    });
  }

  loadUsers() {
    this._usersService.getAllUsers().subscribe(data => {
      this.Users = data;
    },
      err => this._alertify.error(err)
    );
  }
}
