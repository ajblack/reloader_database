import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppalertComponent } from './appalert.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

describe('AppalertComponent', () => {
  let component: AppalertComponent;
  let fixture: ComponentFixture<AppalertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppalertComponent ],
      imports: [NgbModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
