import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PageQuery, InvoiceItems } from '../../models';
import { InvoiceService,PurchaseOrderService } from '../../services';
import { Invoice } from '../../models';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  templateUrl: 'invoice-detail-approve.component.html',
  styleUrls: ['./invoice-detail-approve.component.scss']
})
export class DetailApproveInvoiceComponent implements OnInit {

  private code: string;
  constructor(
    private router: Router,
    private invoiceService: InvoiceService,
    private purchaseOrderService: PurchaseOrderService,
    private toastrService: ToastrService,
    private activatedRoute : ActivatedRoute
  ) { 
    let params = this.activatedRoute.snapshot.params;
    this.code = params.code;
  }

  public pageQuery: PageQuery = new PageQuery();
  public loading: boolean = false;
  public data: Invoice;
  public invoiceItems : InvoiceItems;
  public errors = [];

  ngOnInit() {
    this.getDetailInovice(this.code);
  }

  getDetailInovice(code : string){ 
    this.loading = true;

    this.invoiceService.get(code).subscribe(res => {
      this.loading = false;
      this.data = res;
      this.data.createdDate = new Date(moment.utc(res.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
      this.data.items.forEach(item => {
        if(item.endPeriod == "" && item.startPeriod == "")
          item.period = "-";
          
        item.dueDate = new Date(moment.utc(item.dueDate).local().format('YYYY-MM-DD HH:mm:ss'));
        item.endPeriod = new Date(moment.utc(item.endPeriod).local().format('YYYY-MM-DD HH:mm:ss'));
        item.startPeriod = new Date(moment.utc(item.startPeriod).local().format('YYYY-MM-DD HH:mm:ss'));
        this.getGrandTotal(item.purchaseOrderCode, item.totalBill);
      });
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }  

  getGrandTotal(poCode, totalBill) {
    this.loading = true;
    this.purchaseOrderService.get(poCode).subscribe(data => {
      this.loading = false;
      let invoiceItem = this.data.items.filter(x => x.purchaseOrderCode == poCode);
      invoiceItem[0].totalBillPo = data.grandTotal;
      invoiceItem[0].deviation = Math.abs(totalBill - data.grandTotal);
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }
  
  back() {
    this.router.navigate([`/invoice/approve`]);
  }
  
  reject(){    
    this.loading = true;
    this.invoiceService.reject(this.data.code, this.data).subscribe(res => {
      this.loading = false;
      this.toastrService.success(`Success Reject`);
      this.router.navigate(['/invoice/approve']);
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }  
  
  approve(){    
    this.loading = true;
    this.invoiceService.approve(this.data.code, this.data).subscribe(res => {
      this.loading = false;
      this.toastrService.success(`Success Approve`);
      this.router.navigate(['/invoice/approve']);
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }
}
