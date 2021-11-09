import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePurchaseOrderComponent } from './purchase-order-create.component';
import { PurchaseOrderListComponent } from './purchase-order-list.component';
import { PurchaseOrderDetailListComponent } from './purchase-order-detail-list.component';
import { PurchaseOrderApproveListComponent } from './purchase-order-approve-list.component';
import { PurchaseOrderDetailApproveComponent } from './purchase-order-detail-approve.component';
import { RoleGuard } from '../../guards';

const routes: Routes = [
  {
    path: 'approve',
    component:PurchaseOrderApproveListComponent,
    canActivate: [RoleGuard],
    data: {
      title: 'Approve Purchase Order',
      expectedRoles: [
        'Finance HQ',
        'Finance Branch',
        'administrator',
        'SysAdministrator',
      ]
    }
  },
  {
    path: 'approve/:code',
    component:PurchaseOrderDetailApproveComponent,
    canActivate: [RoleGuard],
    data: {
      title: 'Detail Approve Purchase Order',
      expectedRoles: [
        'Finance HQ',
        'Finance Branch',
        'administrator',
        'SysAdministrator',
      ]
    }
  },
  {
    path: 'list',
    component:PurchaseOrderListComponent,
    data: {
      title: 'Purchase Order'
    }
  }, 
  {
    path: 'list/:code',
    component:PurchaseOrderDetailListComponent,
    data: {
      title: 'Detail Purchase Order'
    }
  }, 
  {
    path: 'create',
    component:CreatePurchaseOrderComponent,
    data: {
      title: 'Purchase Order'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrderRoutingModule {}
