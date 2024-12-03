import { Component, Input } from '@angular/core';
import { Member } from '../../_models/member';
import { RouterLink } from '@angular/router';
import { NgIf, TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-member-card',
    templateUrl: './member-card.component.html',
    styleUrls: ['./member-card.component.css'],
    standalone: true,
    imports: [NgIf, RouterLink, TitleCasePipe]
})
export class MemberCardComponent {
  @Input() member: Member | undefined;
}
