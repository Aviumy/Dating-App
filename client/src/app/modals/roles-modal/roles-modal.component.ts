import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserManagementComponent } from '../../admin/user-management/user-management.component';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent {
  username = '';
  userRoles: string[] = [];
  availableRoles: string[] = [];
  userManagementComponent: UserManagementComponent | undefined;

  constructor(public bsModalRef: BsModalRef) { }

  updateChecked(role: string) {
    const index = this.userRoles.indexOf(role);
    if (index !== -1)
      this.userRoles.splice(index, 1);
    else
      this.userRoles.push(role);
  }

  updateUserRoles() {
    this.userManagementComponent?.updateUserRoles(this.username, this.userRoles)
  }
}
