import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Load} from './load.model';

@Injectable({ providedIn: 'root' })
export class LoadService {
    private currentLoad = new Subject<any>();

    currentLoadSet$ = this.currentLoad.asObservable();

    openEditLoadModal(cL: Load){
      this.currentLoad.next(cL);
    }
}
