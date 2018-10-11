import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {RouterModule, Routes, ActivatedRoute, RouterStateSnapshot} from '@angular/router';

@Component({
  selector: 'app-homeview',
  templateUrl: './homeview.component.html',
  styleUrls: ['./homeview.component.css']
})
export class HomeViewComponent implements OnInit {
  user: string;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
   }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    console.log("homeview current user is :"+this.user);
  }

  logOffUser(){
    this.userService.logOut();
    this.router.navigate(['login']);
  }

}
