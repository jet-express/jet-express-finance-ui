import { Component, OnInit, Input } from '@angular/core';
import { Budget } from '../../../models';

@Component({
  selector: 'app-budgeting-print',
  templateUrl: './budgeting-print.component.html',
  styleUrls: ['./budgeting-print.component.scss']
})
export class BudgetingPrintComponent implements OnInit {
  @Input() data: Budget;
  @Input() type: any;

  constructor() { }

  ngOnInit() {
    var orderVmBudgetItemsById = [];
    this.type.forEach(element => {
      this.data.vmBudgetItems.forEach(element2 => {
        if(element.name == element2.budgetType)
          orderVmBudgetItemsById.push(element2);
      });
    });
  }

}
