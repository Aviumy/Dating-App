import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { inject } from '@angular/core';
import { MembersService } from '../_services/members.service';
import { AccountService } from '../_services/account.service';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {
  const accountService = inject(AccountService);
  const membersService = inject(MembersService);

  if (component.editForm?.dirty || membersService.hasUnsavedProfileChanges) {
    let result = confirm('If you leave the page, all changes will be lost. Do you want to proceed?')
    if (result) {
      membersService.hasUnsavedProfileChanges = false;
      if (accountService.clickedLogOutButton)
        accountService.logout();
    }
    return result;
  }
  return true;
};
