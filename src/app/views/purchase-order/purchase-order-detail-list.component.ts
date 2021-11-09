import { Component, OnInit } from '@angular/core';
import { PageQuery } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseOrderService } from '../../services';
import { PurchaseOrder } from '../../models';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  templateUrl: 'purchase-order-detail-list.component.html'
})
export class PurchaseOrderDetailListComponent implements OnInit{

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
   
  public loading : boolean = false;
  public isPrinting : boolean = false;
  public data: PurchaseOrder;
  public isDeleted : boolean = false;
  public purchaseOrderItems : any;
  public errors = [];

  ngOnInit(){
    this.getDetailPurchaseOrder(this.code);
  }

  getDetailPurchaseOrder(code : string){ 
    this.loading = true;

    this.purchaseOrderService.get(code).subscribe(res => {
      this.loading = false;
      this.data = res;
      this.isDeleted = res.status.toUpperCase() == "CREATED";
      this.data.createdDate = new Date(moment.utc(res.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }
  
  back() {
    this.router.navigate([`/purchase-order/list`]);
  }  

  print(){
    this.isPrinting = true;
  }
  
  delete(){    
    this.loading = true;
    this.purchaseOrderService.void(this.data.code, this.data).subscribe(res => {
      this.loading = false;
      this.toastrService.success(`Success`);
      this.router.navigate(['/purchase-order/list']);
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

}
