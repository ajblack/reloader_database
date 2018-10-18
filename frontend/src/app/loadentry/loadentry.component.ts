import { Component, OnInit, Input } from '@angular/core';
import {Load} from "../load.model";
@Component({
  selector: 'app-loadentry',
  templateUrl: './loadentry.component.html',
  styleUrls: ['./loadentry.component.css']
})
export class LoadEntryComponent implements OnInit {

  @Input() load: Load;

  constructor() { }

  ngOnInit() {
  }

}
