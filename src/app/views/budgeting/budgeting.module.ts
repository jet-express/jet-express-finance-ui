import { NgModule } from '@angular/core';

import { BudgetingRoutingModule } from './budgeting-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BudgetingCreateComponent } from './budgeting-create/budgeting-create.component';
import { BudgetingListComponent } from './budgeting-list/budgeting-list.component';
import { BudgetingDetailComponent } from './budgeting-detail/budgeting-detail.component';
import { JournalCreateComponent } from './journal-create/journal-create.component';
import { JournalListComponent } from './journal-list/journal-list.component';
import { JournalDetailComponent } from './journal-detail/journal-detail.component';
import { BudgetingPrintComponent } from './budgeting-print/budgeting-print.component';

@NgModule({
  imports: [
    BudgetingRoutingModule,
    SharedModule
  ],
  declarations: [
    BudgetingCreateComponent,
    BudgetingListComponent,
    BudgetingDetailComponent,
    JournalCreateComponent,
    JournalListComponent,
    JournalDetailComponent,
    BudgetingPrintComponent,]
})
export class BudgetingModule { }
