import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositInvoiceComponent } from './deposit-invoice.component';

describe('DepositInvoiceComponent', () => {
  let component: DepositInvoiceComponent;
  let fixture: ComponentFixture<DepositInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
