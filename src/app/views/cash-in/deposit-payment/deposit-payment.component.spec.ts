import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositPaymentComponent } from './deposit-payment.component';

describe('DepositPaymentComponent', () => {
  let component: DepositPaymentComponent;
  let fixture: ComponentFixture<DepositPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
