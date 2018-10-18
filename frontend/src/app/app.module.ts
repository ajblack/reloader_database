import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppalertComponent } from './appalert/appalert.component';
import {AppRoutingModule} from './app.routing.module';
import {FormsModule} from "@angular/forms";
import {ApiService} from './app.service';
import {HttpClientModule} from "@angular/common/http";
import { PriceviewComponent } from './priceview/priceview.component';
import {UserService} from './user.service';
import {AlertService} from './alert.service';
import {AuthGuardService} from './auth-guard.service';
import {AuthInterceptor} from './auth-interceptor';
import { RegUserComponent } from './reg-user/reg-user.component';
import {LoadEntryComponent} from './loadentry/loadentry.component';
import { HomeViewComponent } from './homeview/homeview.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppalertComponent,
    PriceviewComponent,
    LoadEntryComponent,
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
    AuthInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ApiService,
    UserService,
    AlertService,
    AuthGuardService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
