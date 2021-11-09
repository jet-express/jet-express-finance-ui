import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageQuery } from '../../models';
import { PurchaseOrderService, BranchService, AuthService } from '../../services';
import { PurchaseOrder, Branch } from '../../models';
import * as moment from 'moment';

@Component({
  templateUrl: 'purchase-order-approve-list.component.html'
})
export class PurchaseOrderApproveListComponent implements OnInit {
  public currentBranch: Branch;

  constructor(
    private router: Router,
    private authService: AuthService,
    private purchaseOrderService: PurchaseOrderService,
    private branchService: BranchService,
  ) {
    this.currentBranch = this.authService.getCurrentBranch();  
  }

  public date;

  public pageQuery: PageQuery = new PageQuery();
  public loading: boolean = false;
  public purchaseOrders : PurchaseOrder[] = [];
  // public branches : Branch[] = [];
  // public selectedBranch : string = "0";

  ngOnInit() {
    this.pageQuery.asc = false;
    this.getData(this.pageQuery);
    // this.getBranches();
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
    this.purchaseOrderService.getCreated(this.currentBranch.code, pageQuery).subscribe(data => {
      this.loading = false;
      this.purchaseOrders = data.data;
      this.pageQuery = data.query;
      this.purchaseOrders.forEach(element => {
        element.createdDate =  new Date(moment.utc(element.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
      });
    }, res => {
      this.loading = false;
      let error = res.error;
    });
  }

  // getBranches(){
  //   this.branchService.getAll({ size: -1 })
  //     .subscribe(res => {
  //       this.branches = res.result.filter(t => !t.isMitra);
  //     });
  // }

  openDetail(item: PurchaseOrder) {
    this.router.navigate([`/purchase-order/approve/${item.code}`]);
  }

}
