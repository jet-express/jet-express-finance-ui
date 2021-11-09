import { NgModule } from '@angular/core';

import { CashInRoutingModule } from './cash-in-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SummaryComponent } from './summary/summary.component';
import { DepositInvoiceComponent } from './deposit-invoice/deposit-invoice.component';
import { DepositPaymentComponent } from './deposit-payment/deposit-payment.component';
import { DepositPaymentDetailComponent } from './deposit-payment-detail/deposit-payment-detail.component';

@NgModule({
  imports: [
    CashInRoutingModule,
    SharedModule
  ],
  declarations: [
    SummaryComponent,
    DepositInvoiceComponent,
    DepositPaymentComponent,
    DepositPaymentDetailComponent]
})
export class CashInModule { }
