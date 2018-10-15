import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from "moment";
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000';



  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get(`${this.uri}/users`);
  }

  authUser(email, password){
    const myuser = {
      username: email,
      password: password
    };


    return this.http.post(`${this.uri}/login`, myuser)
    .pipe(
      tap(res => this.setSession(res))
    );
  }

  private setSession(authResult){
    const expiresAt = moment().add(authResult.expiresIn,'second');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    localStorage.setItem('current_user', authResult.username);
    console.log("from setsession: current user is: "+authResult.username);
  }

  logOut(){
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("current_user");
  }

  isLoggedIn() {
    console.log("checking isLoggedIn");
        return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }

  getCurrentUser(){
    console.log("getcurrentuser is called")
    return localStorage.getItem("current_user");
  }

  public getToken(): string {
    return localStorage.getItem('id_token');
  }

  regNewUser(email, password){
    const myuser = {
      username: email,
      password: password
    };
    return this.http.post(`${this.uri}/reg`, myuser);
  }
}
