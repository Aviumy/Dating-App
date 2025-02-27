import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { authGuard } from "./_guards/auth.guard";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MemberDetailsComponent } from "./members/member-details/member-details.component";
import { ListsComponent } from "./lists/lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { preventUnsavedChangesGuard } from "./_guards/prevent-unsaved-changes.guard";
import { AdminPanelComponent } from "./admin/admin-panel/admin-panel.component";
import { adminGuard } from "./_guards/admin.guard";
import { ServerError500Component } from "./errors/server-error-500/server-error-500.component";
import { NotFound404Component } from "./errors/not-found-404/not-found-404.component";
import { TestErrorComponent } from "./errors/test-error/test-error.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '', runGuardsAndResolvers: 'always', canActivate: [authGuard],
    children: [
      { path: 'members', component: MemberListComponent },
      { path: 'members/:username', component: MemberDetailsComponent },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'profile/edit', component: MemberEditComponent, canDeactivate: [preventUnsavedChangesGuard] },
      { path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard] },
    ]
  },
  //{ path: 'errors', component: TestErrorComponent },
  { path: 'not-found', component: NotFound404Component },
  { path: 'server-error', component: ServerError500Component },
  { path: '**', component: NotFound404Component, pathMatch: 'full' },
];
