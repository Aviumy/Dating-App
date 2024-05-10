import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
  standalone: true,
  imports: [
    CommonModule, TabsModule, 
  ],
})
export class MemberDetailsComponent implements OnInit {
  @Input() username: string = '';
  member: Member | undefined;

  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.membersService.getMember(this.username).subscribe({
      next: member => this.member = member,
    });
  }
}
