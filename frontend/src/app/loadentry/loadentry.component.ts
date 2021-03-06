import { Component, OnInit, Input, Output } from '@angular/core';
import {Load} from "../load.model";
import {LoadService} from "../load.service";
@Component({
  selector: 'app-loadentry',
  templateUrl: './loadentry.component.html',
  styleUrls: ['./loadentry.component.scss']
})
export class LoadEntryComponent implements OnInit {

  @Input() load: Load;
  loadDetailsShowing: boolean;

  constructor(private loadService: LoadService) { }

  ngOnInit() {
    this.loadDetailsShowing = false;
  }

  flipDetailsShowing(){
    this.loadDetailsShowing = !this.loadDetailsShowing;
  }

  openEditLoadModal(){
    this.loadService.openEditLoadModal(this.load);
  }

}
