import { Component, ViewChild, TemplateRef, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {LoadService} from "../load.service";
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

  constructor(private modalService: NgbModal, private loadService: LoadService) {
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

}
