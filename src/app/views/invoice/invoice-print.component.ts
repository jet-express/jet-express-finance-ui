import { Component, OnInit, Input } from '@angular/core';
import { Invoice, UserProfile } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'invoice-print',
  templateUrl: 'invoice-print.component.html',
  styleUrls: ['./invoice-print.component.scss']
})
export class InvoicePrintComponent implements OnInit {
    @Input() data: Invoice;

    constructor(
        private router: Router,
    ) {}
    public grandTotal : number = 0;

    ngOnInit() {
        this.grandTotal = 0;
        this.data.items.forEach(element => {
            this.grandTotal += element.totalBill;
        });
        setTimeout(() => {
            const printContent = document.getElementById("print");
            const WindowPrt = window.open('', '', 'left=0,top=0,width=10000,height=1000,toolbar=0,scrollbars=0,status=0');
            WindowPrt.document.write(printContent.innerHTML);
            WindowPrt.document.close();
            WindowPrt.focus();
            WindowPrt.print();
            WindowPrt.close();
            this.router.navigate(['invoice/list']);
        }, 100);
    }
}