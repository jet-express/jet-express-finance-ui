import { Component, OnInit } from '@angular/core';
import { PageQuery, PurchaseOrderItem } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseOrderService } from '../../services';
import { PurchaseOrder } from '../../models';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  templateUrl: 'purchase-order-detail-approve.component.html'
})
export class PurchaseOrderDetailApproveComponent implements OnInit {

  private code: string;
  constructor( 
    private router: Router,
    private purchaseOrderService : PurchaseOrderService,
    private toastrService: ToastrService,
    private activatedRoute : ActivatedRoute
  ) { 
    let params = this.activatedRoute.snapshot.params;
    this.code = params.code;
  }

  public pageQuery: PageQuery = new PageQuery();
  public loading : boolean = false;
  public data: PurchaseOrder;
  public purchaseOrderItems : any;
  public total : number = 0;
  public errors = [];

  ngOnInit(){
    this.getDetailPurchaseOrder(this.code);
  }

  getDetailPurchaseOrder(code : string){ 
    debugger
    this.loading = true;

    this.purchaseOrderService.get(code).subscribe(res => {
      this.loading = false;
      this.data = res;      
      this.total = 0;
      this.data.items.forEach(item => {
        this.total += item.quantity * item.unitPrice;
      });
      this.data.createdDate = new Date(moment.utc(res.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }  
  
  back() {
    this.router.navigate([`/purchase-order/approve`]);
  }
  
  reject(){    
    this.loading = true;
    this.purchaseOrderService.reject(this.data.code, this.data).subscribe(res => {
      this.loading = false;
      this.toastrService.success(`Success Reject`);
      this.router.navigate(['/purchase-order/approve']);
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }  
  
  approve(){    
    this.loading = true;
    this.purchaseOrderService.approve(this.data.code, this.data).subscribe(res => {
      this.loading = false;
      this.toastrService.success(`Success Approve`);
      this.router.navigate(['/purchase-order/approve']);
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }
}
