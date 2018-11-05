import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/Auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() genderList: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private _aut: AuthService) { }

  ngOnInit() {
  }

  register() {
    console.log(this.model);
    this._aut.register(this.model).subscribe(data => console.log(data));
  }

  cancel() {
    this.cancelRegister.emit(false);
  }


}
