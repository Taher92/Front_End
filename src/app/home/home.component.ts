import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode: boolean;
  genderList = ['Male', 'Female'];
  constructor() { }

  ngOnInit() {
    this.registerMode = false;
  }

  toggleRegister() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(r: boolean) {
    this.registerMode = r;
  }
}
