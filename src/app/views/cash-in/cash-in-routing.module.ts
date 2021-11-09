import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepositInvoiceComponent } from './deposit-invoice/deposit-invoice.component';
import { SummaryComponent } from './summary/summary.component';
import { RoleGuard } from '../../guards';
import { DepositPaymentComponent } from './deposit-payment/deposit-payment.component';
import { DepositPaymentDetailComponent } from './deposit-payment-detail/deposit-payment-detail.component';

const routes: Routes = [
  {
    path: 'summary',
    component:SummaryComponent,
    data: {
      title: 'Summary'
    }
  },
  {
    path: 'deposit-invoice',
    component:DepositInvoiceComponent,
    data: {
      title: 'Deposit Invoice'
    }
  },
  {
    path: 'deposit-payment',
    component:DepositPaymentComponent,
    data: {
      title: 'Deposit Payment'
    }
  },
  {
    path: 'detail/:code',
    component:DepositPaymentDetailComponent,
    data: {
      title: 'Invoice Deposited Detail'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashInRoutingModule {}
