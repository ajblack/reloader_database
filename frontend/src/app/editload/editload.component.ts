import { Component, ViewChild, TemplateRef, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {LoadService} from "../load.service";
import {UserService} from "../user.service";
import {Load} from '../load.model';

@Component({
  selector: 'app-editload',
  templateUrl: './editload.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./editload.component.scss']
})
export class EditLoadComponent implements OnInit {
  currentLoad: Load;
  newCal: string;

  @ViewChild("content") modalContent: TemplateRef<any>

  constructor(private modalService: NgbModal, private loadService: LoadService, private userService: UserService, private ref: ChangeDetectorRef) {
    loadService.currentLoadSet$.subscribe(
      load => {
        this.currentLoad = load;
        this.openModal();
      }
    )
   }

  ngOnInit() {
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  openModal(){
    this.openVerticallyCentered(this.modalContent);
  }

  editLoad(){
    this.currentLoad.caliber = (<HTMLInputElement>document.getElementById("loadcaliber")).value;
    console.log(this.currentLoad);
    this.userService.editLoad(this.currentLoad).subscribe((load: Load) =>{
       this.currentLoad = new Load().fromJSON(load);
    });
  }

}
