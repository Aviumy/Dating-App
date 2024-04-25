import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public accountService: AccountService,
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
        console.log(error)

        if (typeof error.error === 'string') {
          this.toastr.error(error.error);
        }
        else {
          let usernameErrors: any = error.error.errors['Username'];
          let passwordErrors: any = error.error.errors['Password'];

          this.toastr.error(
            (usernameErrors ? usernameErrors.join(' ') : '') + ' ' +
            (passwordErrors ? passwordErrors.join(' ') : '')
          );
        }
      },
      complete: () => console.log(this.model.username + " logged in")
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
