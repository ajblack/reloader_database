import { Component, ViewChild, TemplateRef, OnInit, ViewEncapsulation } from '@angular/core';
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
    this.currentLoad.caliber = "11mm";
    console.log("current load is:");
    console.log(this.currentLoad.caliber);
    console.log("edit load clicks")
    this.userService.editLoad(this.currentLoad).subscribe((load: Load) =>{
       this.currentLoad = load;
       console.log("new current load is: ");
       console.log(this.currentLoad);
    });
  }

}
