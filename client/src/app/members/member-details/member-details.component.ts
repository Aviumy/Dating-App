import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
  standalone: true,
  imports: [
    CommonModule, TabsModule, GalleryModule, 
  ],
})
export class MemberDetailsComponent implements OnInit {
  @Input() username: string = '';
  member: Member | undefined;
  images: GalleryItem[] = [];

  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.membersService.getMember(this.username).subscribe({
      next: member => {
        this.member = member;
        this.loadPhotos();
      }
    });
  }

  loadPhotos() {
    const photos = this.member?.photos;
    if (photos) {
      this.images = photos.map(x => new ImageItem({ src: x.url, thumb: x.url }));
    }
  }
}
