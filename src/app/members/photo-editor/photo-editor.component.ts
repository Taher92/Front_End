import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../../_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/Auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos: Photo[];
  @Output() getProfilePhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  currentMain: Photo;

  constructor(private auth: AuthService, private _userService: UserService) { }

  ngOnInit() {
    this.initsialzeUploader();
  }

  removePhoto(photoId) {

    this._userService.deleteUserPhoto(this.auth.decodenToken.nameid, photoId).subscribe(data => {

      console.log(data);
      const index = this.photos.indexOf(this.photos.find(p => p.id === photoId));
      // delete this.photos[index];
      console.log(this.photos.find(photoId));

    }, err => {
      console.log(err);
    });
  }

  setPhotoAsMain(photo) {
    this._userService.setPhotoAsMain(this.auth.decodenToken.nameid, photo.id).subscribe(data => {
      this.currentMain = this.photos.filter(p => p.isMain === true)[0];
      if (this.currentMain != null) {
        this.currentMain.isMain = false;
      }

      photo.isMain = true;
      this.getProfilePhotoChange.emit(photo.url);
    }, err => console.log('error : ' + err)
    );
  }


  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  initsialzeUploader() {
    this.uploader = new FileUploader(
      {
        url: environment.baseUrl + 'users/' + this.auth.decodenToken.nameid + '/photos/AddPhotoForUser',
        authToken: 'Bearer ' + localStorage.getItem('token'),
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
      }
    );
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          isMain: res.isMain,
          url: res.url,
          dateAdded: res.dateAdded
        };
        this.photos.push(photo);

      }
    };
  }
}
