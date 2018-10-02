import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "./user.model";
import { of} from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ApiService {

  constructor(private http:HttpClient) {}

  public getTest(){
    return "got test"
  }

  public getOutside(): Observable<any> {
    return this.http.get("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR")
  }

  public getUsers(): Observable<any> {
    let fakeUsers : User[] = [{id: 1, firstName: 'Dhiraj', lastName: 'Ray', email: 'dhiraj@gmail.com'},
      {id: 1, firstName: 'Austin', lastName: 'Jac', email: 'Tom@gmail.com'},
      {id: 1, firstName: 'Hary', lastName: 'Pan', email: 'hary@gmail.com'},
      {id: 1, firstName: 'praks', lastName: 'pb', email: 'praks@gmail.com'},
    ];
    return of(fakeUsers);
    //delayedObservable.subscribe(data => console.log(data));
  }

}
