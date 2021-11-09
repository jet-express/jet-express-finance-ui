import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInvoiceDetailComponent } from './payment-invoice-detail-modal.component';

describe('PaymentHistoryComponent', () => {
  let component: PaymentInvoiceDetailComponent;
  let fixture: ComponentFixture<PaymentInvoiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentInvoiceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentInvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
