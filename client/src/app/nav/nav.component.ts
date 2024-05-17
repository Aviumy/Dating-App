import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public accountService: AccountService,
              private membersService: MembersService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
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
      this.accountService.logout();
    }
  }
}
