import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegUserComponent} from './reg-user/reg-user.component';
import { HomeViewComponent } from './homeview/homeview.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'reg-user', component: RegUserComponent},
  {path: 'homeview', component: HomeViewComponent, canActivate: [AuthGuard]},
  {path : '', component : LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule { }
