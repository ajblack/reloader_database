import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes, ActivatedRoute, RouterStateSnapshot} from '@angular/router';

@Component({
  selector: 'app-homeview',
  templateUrl: './homeview.component.html',
  styleUrls: ['./homeview.component.css']
})
export class HomeViewComponent implements OnInit {
  user: string;
  constructor(private route: ActivatedRoute) {
    console.log("Called Constructor");
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user = this.route.snapshot.paramMap.get('user');
      console.log("param 1 is: "+this.user);
    });
  }

}
