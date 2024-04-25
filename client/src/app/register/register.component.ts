import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(public accountService: AccountService, private toastr: ToastrService) { }

  register() {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => {
        console.log(error);

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
      complete: () => console.log(this.model.username + " registered")
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
