import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppalertComponent } from '../appalert/appalert.component';
import { LoadTableComponent } from '../loadtable/loadtable.component';
import { LoadEntryComponent } from '../loadentry/loadentry.component';
import { EditLoadComponent } from '../editload/editload.component';
import { HomeViewComponent } from './homeview.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthInterceptor} from "../auth-interceptor";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing'
describe('HomeviewComponent', () => {
  let component: HomeViewComponent;
  let fixture: ComponentFixture<HomeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeViewComponent, AppalertComponent, LoadTableComponent,LoadEntryComponent, EditLoadComponent ],
      imports: [NgbModule, HttpClientTestingModule, RouterTestingModule],
      providers: [AuthInterceptor]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
