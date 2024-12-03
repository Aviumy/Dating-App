import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../environments/environment.development';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { take } from 'rxjs';
import { Photo } from '../../_models/photo';
import { MembersService } from '../../_services/members.service';
import { NgIf, NgFor, NgClass, NgStyle, DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-photo-editor',
    templateUrl: './photo-editor.component.html',
    styleUrls: ['./photo-editor.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, FileUploadModule, NgClass, NgStyle, DecimalPipe]
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member | undefined;
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user: User | undefined;

  constructor(private accountService: AccountService, private membersService: MembersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user)
          this.user = user
      }
    });
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  setMainPhoto(photo: Photo) {
    this.membersService.setMainPhoto(photo.id).subscribe({
      next: () => {
        if (this.user && this.member) {
          this.member.photos.forEach(x => x.isMain = false);
          this.member.mainPhotoUrl = photo.url;
          photo.isMain = true;

          this.user.mainPhotoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
        }
      }
    });
  }

  deletePhoto(photo: Photo) {
    this.membersService.deletePhoto(photo.id).subscribe({
      next: () => {
        if (this.user && this.member) {
          const index = this.member.photos.indexOf(photo);
          if (index > -1) {
            this.member.photos.splice(index, 1);
            if (photo.isMain) {
              this.member.mainPhotoUrl = '';
              this.user.mainPhotoUrl = '';
              this.accountService.setCurrentUser(this.user);
            }
          }
        }
      }
    });
  }

  fileOverBase(event: any) {
    this.hasBaseDropZoneOver = event;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
      this.membersService.hasUnsavedProfileChanges = true;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        if (!this.member?.photos.length)
          this.setMainPhoto(photo);
        this.member?.photos.push(photo);
      }
    }

    this.uploader.onCompleteItem = () => {
      if (!this.uploader?.queue.length) {
        this.membersService.hasUnsavedProfileChanges = false;
      }
    }
  }

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.membersService.hasUnsavedProfileChanges) {
      $event.returnValue = true;
    }
  }
}
