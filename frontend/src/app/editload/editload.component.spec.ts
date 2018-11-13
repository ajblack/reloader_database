import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoadComponent } from './editload.component';

describe('EditloadComponent', () => {
  let component: EditLoadComponent;
  let fixture: ComponentFixture<EditLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
