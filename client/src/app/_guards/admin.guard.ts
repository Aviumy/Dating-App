import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);
  const router = inject(Router);

  return accountService.currentUser$.pipe(
    map(user => {
      if (!user)
        return false;

      if (user.roles.includes('Admin')) {
        return true;
      }
      else {
        toastr.error("You can not enter this area");
        router.navigateByUrl('/');
        return false;
      }
    })
  );
};
