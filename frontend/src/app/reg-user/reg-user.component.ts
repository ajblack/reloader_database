import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../user.model";
import {UserService} from "../user.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-reg-user',
  templateUrl: './reg-user.component.html',
  styleUrls: ['./reg-user.component.css']
})
export class RegUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
