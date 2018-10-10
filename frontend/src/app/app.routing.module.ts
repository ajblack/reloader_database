import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PriceviewComponent} from './priceview/priceview.component';
import {RegUserComponent} from './reg-user/reg-user.component';
import { HomeViewComponent } from './homeview/homeview.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'priceview', component: PriceviewComponent},
  {path: 'reg-user', component: RegUserComponent},
  {path: 'homeview', component: HomeViewComponent},
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
