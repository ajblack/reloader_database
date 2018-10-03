import { Component, OnInit,OnDestroy, Input } from '@angular/core';
import {AlertService} from "../alert.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appalert',
  templateUrl: './appalert.component.html',
  styleUrls: ['./appalert.component.css']
})
export class AppalertComponent implements OnInit {
  alertShowing:boolean;
  @Input() alertType: string;
  alertText:any;
  getMessageSubscription: Subscription;

  constructor(private alertService: AlertService) {
    this.getMessageSubscription = this.alertService.getMessage().subscribe(message => {
      this.alertText = message.text;
      this.alertType = message.type;
      this.alertShowing = message.showing;
      setTimeout(() => this.alertShowing =false, 5000);
    });
  }

  ngOnInit() {
    this.alertShowing = false;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.getMessageSubscription.unsubscribe();
  }

}
