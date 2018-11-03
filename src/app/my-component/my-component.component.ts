import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent implements OnInit {

  values: any;
  constructor(private _http: HttpClient) { }

  ngOnInit() {
    this.get();
  }

  get() {
    this._http.get('https://localhost:44340/api/values').subscribe(data => {
      this.values = data;
      console.log(data);
    }, error => console.error(error));
  }
}
