import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadentryComponent } from './loadentry.component';

describe('LoadentryComponent', () => {
  let component: LoadentryComponent;
  let fixture: ComponentFixture<LoadentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
