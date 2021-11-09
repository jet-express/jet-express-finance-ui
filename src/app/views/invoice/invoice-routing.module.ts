import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateInvoiceComponent } from './invoice-create.component';
import { ApproveInvoiceComponent } from './invoice-approve.component';
import { DetailApproveInvoiceComponent } from './invoice-detail-approve.component';
import { DetailListInvoiceComponent } from './invoice-detail-list.component';
import { ListInvoiceComponent } from './invoice-list.component';
import { RoleGuard } from '../../guards';

const routes: Routes = [
  {
    path: 'create',
    component:CreateInvoiceComponent,
    data: {
      title: 'Invoice'
    }
  },
  {
    path: 'list',
    component:ListInvoiceComponent,
    data: {
      title: 'Invoice List'
    }
  },
  {
    path: 'list/:code',
    component:DetailListInvoiceComponent,
    data: {
      title: 'Detail Invoice List'
    }
  },
  {
    path: 'approve',
    component:ApproveInvoiceComponent,
    canActivate: [RoleGuard],
    data: {
      title: 'Approve Invoice List',
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
    component:DetailApproveInvoiceComponent,
    canActivate: [RoleGuard],
    data: {
      title: 'Detail Approve List',
      expectedRoles: [
        'Finance HQ',
        'Finance Branch',
        'administrator',
        'SysAdministrator',
      ]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule {}
