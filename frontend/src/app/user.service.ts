import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

    return this.http.post(`${this.uri}/login`, myuser);
  }

  regNewUser(email, password){
    const myuser = {
      username: email,
      password: password
    };
    return this.http.post(`${this.uri}/reg`, myuser);
  }
}
