import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePaymentComponent } from './payment-create.component';
import { PaymentHistoryComponent } from './payment-history.component';
import { PaymentInvoiceDetailComponent } from './payment-invoice-detail-modal.component';
import { RoleGuard } from '../../guards';


const routes: Routes = [
  {
    path: 'create',
    component:CreatePaymentComponent,
    canActivate: [RoleGuard],
    data: {
      title: 'Payment',
      expectedRoles: [
        'Finance HQ',
        'Finance Branch',
        'administrator',
        'SysAdministrator',
      ]
    },
    children: [
      {
        path: ':code',
        component: PaymentInvoiceDetailComponent,
        data: {
          title: 'Detail'
        }
      }
    ]
  },
  {
    path: 'history',
    component:PaymentHistoryComponent,
    data: {
      title: 'History'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule {}
