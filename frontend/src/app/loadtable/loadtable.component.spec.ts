import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadtableComponent } from './loadtable.component';

describe('LoadtableComponent', () => {
  let component: LoadtableComponent;
  let fixture: ComponentFixture<LoadtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
