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
import {UserService} from './user.service';
import {AlertService} from './alert.service';
import {LoadService} from './load.service';
import {AuthGuardService} from './auth-guard.service';
import {AuthInterceptor} from './auth-interceptor';
import { RegUserComponent } from './reg-user/reg-user.component';
import {LoadEntryComponent} from './loadentry/loadentry.component';
import {LoadTableComponent} from './loadtable/loadtable.component';
import { HomeViewComponent } from './homeview/homeview.component';
import { EditLoadComponent } from './editload/editload.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppalertComponent,
    LoadEntryComponent,
    LoadTableComponent,
    RegUserComponent,
    HomeViewComponent,
    EditLoadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
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
    LoadService,
    AuthGuardService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
