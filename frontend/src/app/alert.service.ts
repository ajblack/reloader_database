import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<any>();

    sendMessage(message: string, type = "danger") {
      console.log("message from sendMessage is: "+message);
        this.subject.next({ text: message, type: type,showing:true });
    }

    showMessage(){
      this.subject.next({showing: true});
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
