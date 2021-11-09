import { Component, OnInit } from '@angular/core';
import { PageQuery, PurchaseOrder, Branch } from '../../models';
import { Router } from '@angular/router';
import { PurchaseOrderService, AuthService } from '../../services';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  templateUrl: 'purchase-order-list.component.html'
})
export class PurchaseOrderListComponent implements OnInit {
  public currentBranch: Branch;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService,
    private purchaseOrderService: PurchaseOrderService,
  ) {    
    this.currentBranch = this.authService.getCurrentBranch(); 
  }
  

  public errors = [];
  public pageQuery: PageQuery = new PageQuery();
  public loading: boolean = false;
  public purchaseOrders : PurchaseOrder[] = [];
  public status = "0";
  public statusList = [
    "Created",
    "Approved",
    "Invoiced",
    "Rejected",
    "Void"
  ];

  ngOnInit() {
    this.pageQuery.asc = false;
    this.getAllData(this.pageQuery);
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
      this.getCreated(this.pageQuery);
    else if (this.status == "Approved")
      this.getApproved(this.pageQuery);
    else if (this.status == "Invoiced")
      this.getInvoiced(this.pageQuery);
    else if (this.status == "Rejected")
      this.getRejected(this.pageQuery);
    else if (this.status == "Void")
      this.getVoid(this.pageQuery);
    else
      this.getAllData(this.pageQuery);
  }

  getAllData(pageQuery: PageQuery) {
    this.loading = true;
    this.purchaseOrderService.getAll(this.currentBranch.code, pageQuery).subscribe(result => {
      this.loading = false;
      this.purchaseOrders = result.data;
      this.pageQuery = result.query;
      this.purchaseOrders.forEach(element => {
          element.createdDate = new Date(moment.utc(element.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
      });
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

  getCreated(pageQuery: PageQuery) {
    this.loading = true;

    this.purchaseOrderService.getCreated(this.currentBranch.code, pageQuery).subscribe(result => {
      this.loading = false;
      this.purchaseOrders = result.data;
      this.pageQuery = result.query;
      this.purchaseOrders.forEach(element => {
          element.createdDate = new Date(moment.utc(element.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
      });
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }
  
  getApproved(pageQuery: PageQuery) {
    this.loading = true;

    this.purchaseOrderService.getApproved(this.currentBranch.code, pageQuery).subscribe(result => {
      this.loading = false;
      this.purchaseOrders = result.data;
      this.pageQuery = result.query;
      this.purchaseOrders.forEach(element => {
          element.createdDate = new Date(moment.utc(element.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
      });
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }
  
  getInvoiced(pageQuery: PageQuery) {
    this.loading = true;

    this.purchaseOrderService.getInvoiced(this.currentBranch.code, pageQuery).subscribe(result => {
      this.loading = false;
      this.purchaseOrders = result.data;
      this.pageQuery = result.query;
      this.purchaseOrders.forEach(element => {
          element.createdDate = new Date(moment.utc(element.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
      });
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }
  
  getRejected(pageQuery: PageQuery) {
    this.loading = true;

    this.purchaseOrderService.getRejected(this.currentBranch.code, pageQuery).subscribe(result => {
      this.loading = false;
      this.purchaseOrders = result.data;
      this.pageQuery = result.query;
      this.purchaseOrders.forEach(element => {
          element.createdDate = new Date(moment.utc(element.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
      });
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }
  
  getVoid(pageQuery: PageQuery) {
    this.loading = true;

    this.purchaseOrderService.getVoid(this.currentBranch.code, pageQuery).subscribe(result => {
      this.loading = false;
      this.purchaseOrders = result.data;
      this.pageQuery = result.query;
      this.purchaseOrders.forEach(element => {
          element.createdDate = new Date(moment.utc(element.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
      });
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }
  
  openDetail(item: PurchaseOrder) {
    this.router.navigate([`/purchase-order/list/${item.code}`]);
  }

}
