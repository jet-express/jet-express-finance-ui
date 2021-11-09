import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositPaymentDetailComponent } from './deposit-payment-detail.component';

describe('DepositPaymentDetailComponent', () => {
  let component: DepositPaymentDetailComponent;
  let fixture: ComponentFixture<DepositPaymentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositPaymentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositPaymentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
