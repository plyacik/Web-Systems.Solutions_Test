import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './auth/auth.guard';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { ActiveComponent } from './users/active/active.component';
import { AdministrationsComponent } from './users/administrations/administrations.component';


const routes: Routes = [
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent }
    ]
  },
  {
    path: 'users', component: UsersComponent, canActivate: [AuthGuard],
    children: [
      { path: 'list', component: UserListComponent },
      { path: 'active', component: ActiveComponent },
      { path: 'administration', component: AdministrationsComponent },
      { path: ':id', component: UserDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
