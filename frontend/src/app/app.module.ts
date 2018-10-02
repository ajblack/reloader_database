import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from './app.routing.module';
import {FormsModule} from "@angular/forms";
import {ApiService} from './app.service';
import {HttpClientModule} from "@angular/common/http";
import { PriceviewComponent } from './priceview/priceview.component';
import {UserService} from './user.service';
import { RegUserComponent } from './reg-user/reg-user.component';
import { HomeViewComponent } from './homeview/homeview.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PriceviewComponent,
    RegUserComponent,
    HomeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    ApiService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
