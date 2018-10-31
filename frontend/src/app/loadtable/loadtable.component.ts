import { Component, OnInit, Input } from '@angular/core';
import {Load} from "../load.model";

@Component({
  selector: 'app-loadtable',
  templateUrl: './loadtable.component.html',
  styleUrls: ['./loadtable.component.css']
})
export class LoadTableComponent implements OnInit {
  @Input() loadData: Load[];
  loadFields: {};
  loadFieldsProps: string[];
  loadFieldsVals: string[];
  constructor() { }

  ngOnInit() {
    this.loadFields = {
      "owner":"Owner",
      "name":"Load Name",
      "caliber":"Caliber",
      "bulletWeight":"Bullet Weight",
      "powderWeight":"Powder Weight",
      "powderType":"Powder Type",
      "oal":"OAL",
      "primer":"Primer",
      "notes":"Notes"
    }

    this.loadFieldsProps = Object.keys(this.loadFields);
    this.loadFieldsVals = Object.values(this.loadFields);
  }

  ngOnChanges(){
    console.log("ngOnchanges called for load table")
    console.log(this.loadData);
  }

}