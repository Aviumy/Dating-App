import { Component, OnInit, inject } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { ActivatedRoute } from '@angular/router';

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
  private route = inject(ActivatedRoute);
  member: Member | undefined;
  images: GalleryItem[] = [];

  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) {
      return;
    }
    this.membersService.getMember(username).subscribe({
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
