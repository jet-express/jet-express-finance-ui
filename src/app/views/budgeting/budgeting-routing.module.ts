import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetingCreateComponent } from './budgeting-create/budgeting-create.component';
import { BudgetingListComponent } from './budgeting-list/budgeting-list.component';
import { BudgetingDetailComponent } from './budgeting-detail/budgeting-detail.component';
import { JournalCreateComponent } from './journal-create/journal-create.component';
import { JournalListComponent } from './journal-list/journal-list.component';
import { JournalDetailComponent } from './journal-detail/journal-detail.component';
import { RoleGuard } from '../../guards';

const routes: Routes = [
  {
    path: 'create',
    component:BudgetingCreateComponent,
    data: {
      title: 'Create Budget'
    }
  },
  {
    path: 'list',
    component:BudgetingListComponent,
    data: {
      title: 'List Budget'
    }
  },
  {
    path: 'list-approve',
    component:BudgetingListComponent,
    data: {
      title: 'List Approve'
    }
  },
  {
    path: 'detail/:code',
    component:BudgetingDetailComponent,
    data: {
      title: 'Detail Budget'
    }
  },
  {
    path: 'approve/:code',
    component:BudgetingDetailComponent,
    data: {
      title: 'Approve Budget'
    }
  },
  {
    path: 'journal-create',
    component:JournalCreateComponent,
    data: {
      title: 'Input Journal'
    }
  },
  {
    path: 'journal-list',
    component:JournalListComponent,
    data: {
      title: 'Receipt Journal'
    }
  },
  {
    path: 'journal-detail/:code',
    component:JournalDetailComponent,
    data: {
      title: 'Detail Journal'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetingRoutingModule {}
