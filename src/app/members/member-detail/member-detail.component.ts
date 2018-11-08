import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  user: User;
  imagesUrl: any = [];
  constructor(private _userService: UserService, private _alertify: AlertifyService, private _rout: ActivatedRoute) { }

  ngOnInit() {
    this._rout.data.subscribe(data => {
      this.user = data['user'];
    });

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    this.galleryImages = this.getUserImages();
  }

  loadUser() {
    this._userService.getUserById(this._rout.snapshot.params['id']).subscribe(
      data => {
        this.user = data;
        this.user.photoUrl = 'https://cdn.icon-icons.com/icons2/550/PNG/512/business-color_business-contact-86_icon-icons.com_53469.png';
        this._alertify.message('Welcome to the home page of ' + this.user.userName);
      },
      err => {
        console.error(err);
        this._alertify.error('something went wrong');
      }
    );
  }
  getUserImages() {
    if (this.user.photos != null) {
      for (let i = 0; i < this.user.photos.length; i++) {
        this.imagesUrl.push({
          small: this.user.photos[i].url,
          medium: this.user.photos[i].url,
          big: this.user.photos[i].url
        });
      }
      return this.imagesUrl;
    }


  }
}
