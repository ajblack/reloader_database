import { Component, ViewChild, TemplateRef, OnInit, ViewEncapsulation} from '@angular/core';
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

  constructor(private modalService: NgbModal, private loadService: LoadService, private userService: UserService) {
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
    this.currentLoad.name = (<HTMLInputElement>document.getElementById("loadname")).value;
    this.currentLoad.caliber = (<HTMLInputElement>document.getElementById("loadcaliber")).value;

    this.currentLoad.bulletWeight = +(<HTMLInputElement>document.getElementById("loadbulletweight")).value;
    this.currentLoad.bulletType = (<HTMLInputElement>document.getElementById("loadbullettype")).value;

    this.currentLoad.powderWeight = +(<HTMLInputElement>document.getElementById("loadpowderweight")).value;
    this.currentLoad.powderType = (<HTMLInputElement>document.getElementById("loadpowdertype")).value;

    this.currentLoad.oal = +(<HTMLInputElement>document.getElementById("loadoal")).value;
    this.currentLoad.primer = (<HTMLInputElement>document.getElementById("loadprimer")).value;
    console.log(this.currentLoad);
    this.userService.editLoad(this.currentLoad).subscribe((load: Load) =>{
       this.currentLoad = new Load().fromJSON(load);
    });
  }

}
