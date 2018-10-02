import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceviewComponent } from './priceview.component';

describe('PriceviewComponent', () => {
  let component: PriceviewComponent;
  let fixture: ComponentFixture<PriceviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
