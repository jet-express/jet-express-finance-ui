import { NgModule } from '@angular/core';

import { PurchaseOrderRoutingModule } from './purchase-order-routing.module';
import { CreatePurchaseOrderComponent } from './purchase-order-create.component';
import { PurchaseOrderListComponent } from './purchase-order-list.component';
import { PurchaseOrderDetailListComponent } from './purchase-order-detail-list.component';
import { PurchaseOrderApproveListComponent } from './purchase-order-approve-list.component';
import { PurchaseOrderDetailApproveComponent } from './purchase-order-detail-approve.component';
import { PurchaseOrderPrintComponent } from './purchase-order-print.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    PurchaseOrderRoutingModule,
    SharedModule
  ],
  declarations: [
    CreatePurchaseOrderComponent,
    PurchaseOrderListComponent,
    PurchaseOrderDetailListComponent,
    PurchaseOrderApproveListComponent,
    PurchaseOrderDetailApproveComponent,
    PurchaseOrderPrintComponent
  ]
})
export class PurchaseOrderModule { }
