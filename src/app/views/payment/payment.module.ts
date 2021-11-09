import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PaymentRoutingModule } from './payment-routing.module';
import { CreatePaymentComponent } from './payment-create.component';
import { PaymentHistoryComponent } from './payment-history.component';
import { PaymentInvoiceDetailComponent } from './payment-invoice-detail-modal.component';

@NgModule({
  imports: [
    PaymentRoutingModule,
    SharedModule
  ],
  declarations: [
    CreatePaymentComponent,
    PaymentHistoryComponent,
    PaymentInvoiceDetailComponent
  ]
})
export class PaymentModule { }
