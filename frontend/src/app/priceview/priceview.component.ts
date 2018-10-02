import { Component, OnInit } from '@angular/core';
import {ApiService} from '../app.service';
import {Priceview} from './priceview.model';
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-priceview',
  templateUrl: './priceview.component.html',
  styleUrls: ['./priceview.component.css']
})
export class PriceviewComponent implements OnInit {
  coinData:Priceview;


  constructor(private apiService: ApiService) { }

  ngOnInit() {
    interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.apiService.getOutside())
      )
    .subscribe(
      (data:Priceview) => {
        this.coinData = data;
        console.log(data)
        console.log(this.coinData);
      }
    );


  }

}
