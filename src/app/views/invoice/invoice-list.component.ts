import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageQuery } from '../../models';
import { InvoiceService, AuthService } from '../../services';
import { Invoice, Branch } from '../../models';
import * as moment from 'moment';

@Component({
  templateUrl: 'invoice-list.component.html'
})
export class ListInvoiceComponent implements OnInit {
  public currentBranch: Branch;
  constructor(
    private router: Router,
    private invoiceService: InvoiceService,
    private authService: AuthService,
  ) { 
    this.currentBranch = this.authService.getCurrentBranch();  
  }

  public pageQuery = new PageQuery();
  public loading: boolean = false;
  public invoices : Invoice[] = [];
  public status = "0";
  public statusList = [
    "Created",
    "Approved",
    "Completed",
    "Rejected",
    "Void"
  ];

  ngOnInit() {
    this.pageQuery.asc = false;
    this.getAllData();
  }

  search() {
    this.pageQuery.page = 1;
    this.pageQuery.date = moment.utc(this.pageQuery.date).local().format('MM/DD/YYYY HH:mm:ss');
    this.filterByStatus();
  }

  pageChanged(event: any) {
    this.pageQuery.page = event.page;
    this.filterByStatus();
  }

  filterByStatus(){    
    if (this.status == "Created")
      this.getCreated();
    else if (this.status == "Approved")
      this.getApproved();
    else if (this.status == "Completed")
      this.getCompleted();
    else if (this.status == "Rejected")
      this.getRejected();
    else if (this.status == "Void")
      this.getVoid();
    else
      this.getAllData();
  }

  getAllData() {
    this.loading = true;

    this.pageQuery.date = this.pageQuery.date;
    this.invoiceService.getAll(this.currentBranch.code, this.pageQuery).subscribe(result => {
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

  getCreated() {
    this.loading = true;

    this.invoiceService.getCreated(this.currentBranch.code, this.pageQuery).subscribe(result => {
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

  getApproved() {
    this.loading = true;

    this.invoiceService.getApproved(this.currentBranch.code, this.pageQuery).subscribe(result => {
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

  getCompleted() {
    this.loading = true;

    this.invoiceService.getCompleted(this.currentBranch.code, this.pageQuery).subscribe(result => {
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

  getRejected() {
    this.loading = true;

    this.invoiceService.getRejected(this.currentBranch.code, this.pageQuery).subscribe(result => {
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

  getVoid() {
    this.loading = true;

    this.invoiceService.getVoid(this.currentBranch.code, this.pageQuery).subscribe(result => {
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
    this.router.navigate([`/invoice/list/${item.code}`]);
  }
}
