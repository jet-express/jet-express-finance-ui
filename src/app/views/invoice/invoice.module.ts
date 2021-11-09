import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { CreateInvoiceComponent } from './invoice-create.component';
import { ApproveInvoiceComponent } from './invoice-approve.component';
import { DetailApproveInvoiceComponent } from './invoice-detail-approve.component';
import { DetailListInvoiceComponent } from './invoice-detail-list.component';
import { ListInvoiceComponent } from './invoice-list.component';
import { InvoicePrintComponent } from './invoice-print.component';

@NgModule({
  imports: [
    InvoiceRoutingModule,
    SharedModule
  ],
  declarations: [
    CreateInvoiceComponent,
    ApproveInvoiceComponent,
    DetailApproveInvoiceComponent,
    DetailListInvoiceComponent,
    ListInvoiceComponent,
    InvoicePrintComponent
  ]
})
export class InvoiceModule { }
