import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from "@angular/router";
import {User} from "../user.model";
import {UserService} from "../user.service";
import { throwError } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  user: string;
  staticAlertClosed = true;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  handleLoginError(error: HttpErrorResponse) {
    console.log("handling error");
    this.staticAlertClosed = false;
    setTimeout(() => this.staticAlertClosed = true, 5000);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  authUser(){
    this.userService.authUser(this.email, this.password).subscribe((data: string)=>{
      this.user = data;
      console.log("User authenticated: "+this.user);
      console.log(this.user);
      setTimeout(() => this.staticAlertClosed = true, 20000)
      this.router.navigate(['homeview',this.user]);
    }, error => this.handleLoginError(error));
  }

  regNewUser(){
    this.router.navigate(['reg-user']);
    /*
    this.email = "ehalseth@gmail.com";
    this.password = "new test password";
    this.userService.regNewUser(this.email, this.password).subscribe((response:String)=>{
      console.log("in response");
      console.log("user authenticated: "+response);
    })
    */
  }

}
