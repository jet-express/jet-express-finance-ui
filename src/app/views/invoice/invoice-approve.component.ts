import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageQuery } from '../../models';
import { InvoiceService, AuthService } from '../../services';
import { Invoice, Branch } from '../../models';
import * as moment from 'moment';

@Component({
  templateUrl: 'invoice-approve.component.html'
})
export class ApproveInvoiceComponent implements OnInit {
  public currentBranch: Branch;
  constructor(
    private router: Router,
    private invoiceService: InvoiceService,
    private authService: AuthService,
  ) {
    this.currentBranch = this.authService.getCurrentBranch();  
  }

  public pageQuery: PageQuery = new PageQuery();
  public loading: boolean = false;
  public invoices : Invoice[] = [];

  ngOnInit() {
    this.pageQuery.asc = false;
    this.getData(this.pageQuery);
  }

  search() {
    this.pageQuery.page = 1;
    this.pageQuery.date = moment.utc(this.pageQuery.date).local().format('MM/DD/YYYY HH:mm:ss');

    this.getData(this.pageQuery);
  }

  pageChanged(event: any) {
    this.pageQuery.page = event.page;

    this.getData(this.pageQuery);
  }

  getData(pageQuery: PageQuery) {
    this.loading = true;

    this.invoiceService.getCreated(this.currentBranch.code, pageQuery).subscribe(result => {
      this.loading = false;
      this.invoices = result.data;
      this.invoices.forEach(element => {
        element.createdDate = new Date(moment.utc(element.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
      });
      this.pageQuery = result.query;
    }, res => {
      this.loading = false;
      let error = res.error;
    });
  }
  
  openDetail(item: Invoice) {
    this.router.navigate([`/invoice/approve/${item.code}`]);
  }
}
