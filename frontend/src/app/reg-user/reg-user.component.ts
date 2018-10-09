import { Component, OnInit } from '@angular/core';
import {User} from "../user.model";
import {UserService} from "../user.service";
import {AlertService} from "../alert.service";
import { ActivatedRoute } from "@angular/router";
import { throwError } from "rxjs";
import {Router} from "@angular/router";
import {HttpErrorResponse} from '@angular/common/http';
import {AppalertComponent} from "../appalert/appalert.component";

@Component({
  selector: 'app-reg-user',
  templateUrl: './reg-user.component.html',
  styleUrls: ['./reg-user.component.css']
})
export class RegUserComponent implements OnInit {
  email:string;
  password:string;
  user:string;

  constructor(private router: Router, private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
  }

  handleRegisterUserError(error: HttpErrorResponse, place:string) {
    console.log("handling error in: "+place);
    this.alertService.sendMessage("Unable to register new user");
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
  }

  registerNewUser(){
    this.userService.regNewUser(this.email, this.password).subscribe((response:String)=>{
      console.log(response);
      if(response=="user exists"){
        //put up modal window that the user exists already
        this.alertService.sendMessage("User already exists");
      }
      else{
        //redirect to home page.  put up modal window that the user is all ready to roll
        this.alertService.sendMessage("User successfully created", "success");
        this.userService.authUser(this.email, this.password).subscribe((data:User)=>{
          this.user = this.userService.getCurrentUser();
          this.router.navigate(['homeview',this.user]);
        }, error => this.handleRegisterUserError(error, "error in logging in the newly registered user"));
      }
    }, error => this.handleRegisterUserError(error, "error in registering the new user"));

  }

}
