import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MembersService } from '../_services/members.service';
import { Member } from '../_models/member';
import { take } from 'rxjs';
import { User } from '../_models/user';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HasRoleDirective } from '../_directives/has-role.directive';
import { NgIf, AsyncPipe, TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    standalone: true,
    imports: [RouterLink, RouterLinkActive, NgIf, HasRoleDirective, BsDropdownModule, FormsModule, AsyncPipe, TitleCasePipe]
})
export class NavComponent implements OnInit {
  model: any = {};
  member: Member | undefined;

  constructor(public accountService: AccountService,
              private membersService: MembersService,
              private router: Router) { }

  ngOnInit(): void {
    let user: User | undefined;
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: u => user = u as User,
    });
    if (user) {
      this.getMember(user.username);
    }
  }

  getMember(username: string) {
    this.membersService.getMember(username).subscribe({
      next: member => this.member = member,
    });
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        if (response) {
          this.getMember(response.username);
        }
        this.router.navigateByUrl('/members');
      },
      error: error => {
        console.log(error);
      },
      complete: () => console.log(this.model.username + " logged in")
    });
  }

  logout() {
    this.router.navigateByUrl('/');
    this.accountService.clickedLogOutButton = true;
    if (!this.membersService.hasUnsavedProfileChanges) {
      this.member = undefined;
      this.accountService.logout();
    }
  }
}
