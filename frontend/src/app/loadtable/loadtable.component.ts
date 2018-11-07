import { Component, OnInit, Input } from '@angular/core';
import {Load} from "../load.model";

@Component({
  selector: 'app-loadtable',
  templateUrl: './loadtable.component.html',
  styleUrls: ['./loadtable.component.scss']
})
export class LoadTableComponent implements OnInit {
  @Input() loadData: Load[];
  loadFields: {};
  loadFieldsProps: string[];
  loadFieldsVals: string[];
  constructor() { }

  ngOnInit() {
    this.loadFields = {
      "name":"Load Name",
      "caliber":"Caliber",
      "bulletWeight":"Bullet Weight",
      "bulletType": "Bullet Type"
      "powderWeight":"Powder Weight",
      "powderType":"Powder Type",
      "oal":"OAL",
      "primer":"Primer"
    }

    this.loadFieldsProps = Object.keys(this.loadFields);
    this.loadFieldsVals = Object.values(this.loadFields);
  }

  ngOnChanges(){
    /*
    console.log("ngOnchanges called for load table")
    console.log(this.loadData);
    */
  }

}
