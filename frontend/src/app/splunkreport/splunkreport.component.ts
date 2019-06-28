import { Component, OnInit } from '@angular/core';
import {AuthInterceptor} from "../auth-interceptor";
import {Router} from "@angular/router";
import {SplunkDataService} from "../splunkdata.service";
import {RouterModule, Routes, ActivatedRoute, RouterStateSnapshot} from '@angular/router';

@Component({
  selector: 'app-splunkreport',
  templateUrl: './splunkreport.component.html',
  styleUrls: ['./splunkreport.component.scss']
})
export class SplunkReportComponent implements OnInit {


  constructor(private splunkDataService: SplunkDataService,private authInterceptor: AuthInterceptor, private route: ActivatedRoute, private router: Router) {
   }

  ngOnInit() {
    console.log("initializing splunk report componente")
    let v = this.splunkDataService.getUniqueDataFeeds().subscribe((result)=>{
      console.log(result)
    });
    console.log(v);
  }



}
