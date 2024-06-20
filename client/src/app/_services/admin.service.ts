import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    return this.http.get<User[]>(this.baseUrl + 'admin/users-with-roles');
  }

  getAllRoles() {
    return this.http.get<string[]>(this.baseUrl + 'admin/roles');
  }

  updateUserRoles(username: string, roles: string) {
    return this.http.post<string[]>(
      `${this.baseUrl}admin/edit-roles/${username}?roles=${roles}`, {}
    );
  }
}
