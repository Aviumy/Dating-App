import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { User } from '../../_models/user';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from '../../modals/roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  availableRoles: string[] = [];
  bsModalRef: BsModalRef<RolesModalComponent> = new BsModalRef<RolesModalComponent>();

  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getAllRoles();
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    return this.adminService.getUsersWithRoles().subscribe({
      next: users => this.users = users
    });
  }

  getAllRoles() {
    return this.adminService.getAllRoles().subscribe({
      next: roles => this.availableRoles = roles
    });
  }

  updateUserRoles(username: string, roles: string[]) {
    const user: User | undefined = this.users.find(x => x.username === username);
    if (user) {
      if (JSON.stringify(user.roles.sort()) !== JSON.stringify(roles.sort())) {
        this.adminService.updateUserRoles(username, roles.join(',')).subscribe({
          next: roles => user.roles = roles
        });
      }
    }
  }

  openRolesModal(user: User) {
    const config: ModalOptions = {
      class: 'modal-dialog-centered',
      initialState: {
        username: user.username,
        availableRoles: this.availableRoles,
        userRoles: [...user.roles],
        userManagementComponent: this,
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
  }
}
