import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {AuthInterceptor} from "../auth-interceptor";
import {Router} from "@angular/router";
import {Load} from "../load.model";
import {RouterModule, Routes, ActivatedRoute, RouterStateSnapshot} from '@angular/router';

@Component({
  selector: 'app-homeview',
  templateUrl: './homeview.component.html',
  styleUrls: ['./homeview.component.css']
})
export class HomeViewComponent implements OnInit {
  user: string;
  loadData: Load[];
  constructor(private authInterceptor: AuthInterceptor, private route: ActivatedRoute, private userService: UserService, private router: Router) {
   }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.userService.getUserLoadData().subscribe((loads: Load[]) =>{
       this.loadData = loads;
    });
  }

  checkData(){
    console.log("load data is: ");
    console.log(this.loadData);
  }

  logOffUser(){
    this.userService.logOut();
    this.router.navigate(['login']);
  }

}
