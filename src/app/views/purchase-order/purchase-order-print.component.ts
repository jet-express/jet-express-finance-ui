import { Component, OnInit, Input } from '@angular/core';
import { PurchaseOrder, UserProfile } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'purchase-order-print',
  templateUrl: 'purchase-order-print.component.html',
  styleUrls: ['./purchase-order-print.component.scss']
})
export class PurchaseOrderPrintComponent implements OnInit {
    @Input() data: PurchaseOrder;

    constructor(
        private router: Router,
    ) {}

    ngOnInit() {
        setTimeout(() => {
            const printContent = document.getElementById("print");
            const WindowPrt = window.open('', '', 'left=0,top=0,width=10000,height=1000,toolbar=0,scrollbars=0,status=0');
            WindowPrt.document.write(printContent.innerHTML);
            WindowPrt.document.close();
            WindowPrt.focus();
            WindowPrt.print();
            WindowPrt.close();
            this.router.navigate(['purchase-order/list']);
        }, 100);
    }
}