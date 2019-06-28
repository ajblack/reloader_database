import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from "moment";
import {tap} from 'rxjs/operators'
import {Load} from "./load.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SplunkDataService {

  uri = 'http://localhost:4000';
  user: string;


  constructor(private http:HttpClient) { }

  getUniqueDataFeeds(){
    console.log("in splunkdataservice, calling api")
    return this.http.get(`${this.uri}/uniquedatafeeds`);
  }

}
