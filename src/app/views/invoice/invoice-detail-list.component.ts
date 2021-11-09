import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PageQuery } from '../../models';
import { InvoiceService } from '../../services';
import { Invoice } from '../../models';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  templateUrl: 'invoice-detail-list.component.html',
  styleUrls: ['./invoice-detail-list.component.scss']
})
export class DetailListInvoiceComponent implements OnInit {

  private code: string;
  constructor(
    private router: Router,
    private invoiceService: InvoiceService,
    private toastrService: ToastrService,
    private activatedRoute : ActivatedRoute
  ) { 
    let params = this.activatedRoute.snapshot.params;
    this.code = params.code;
  }

  public errors = [];
  public pageQuery: PageQuery = new PageQuery();
  public isPrinting : boolean = false;
  public loading: boolean = false;
  public isDeleted : boolean = false;
  public data: Invoice;

  ngOnInit() {
    this.getDetailInvoice(this.code);
  }  

  getDetailInvoice(code : string){ 
    this.loading = true;

    this.invoiceService.get(code).subscribe(res => {
      this.loading = false;
      this.data = res;
      this.isDeleted = res.status.toUpperCase() == "CREATED";
      this.data.createdDate = new Date(moment.utc(res.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
      this.data.items.forEach(item => {
        if(item.endPeriod == "" && item.startPeriod == "")
          item.period = "-";
          
        item.dueDate = new Date(moment.utc(item.dueDate).local().format('YYYY-MM-DD HH:mm:ss'));
        item.endPeriod = new Date(moment.utc(item.endPeriod).local().format('YYYY-MM-DD HH:mm:ss'));
        item.startPeriod = new Date(moment.utc(item.startPeriod).local().format('YYYY-MM-DD HH:mm:ss'));
        item.deviation = Math.abs(item.totalBill - item.totalBillPo);
      });
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }  
  
  back() {
    this.router.navigate([`/invoice/list`]);
  }

  print(){
    this.isPrinting = true;
  }
  
  delete(){    
    this.loading = true;
    this.invoiceService.void(this.data.code, this.data).subscribe(res => {
      this.loading = false;
      this.toastrService.success(`Success`);
      this.router.navigate(['/invoice/list']);
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }
}
