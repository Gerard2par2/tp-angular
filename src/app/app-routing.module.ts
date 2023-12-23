import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UsersPageComponent } from './user/users-page.component';
import { UserFormModes } from './shared/enums/user-form-modes.enum';
import { UserFormComponent } from './user/user-form/user-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  { path: 'users', component: UsersPageComponent },
  { path: 'user/:id', component: UserDetailsComponent },
  { path: 'update/:id', component: UserFormComponent, data: { mode: UserFormModes.EDIT} },
  { path: 'add', component: UserFormComponent, data: { mode: UserFormModes.ADD} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
