import { Component, OnInit } from '@angular/core';
import { PurchaseOrderService, VendorService, AuthService, BudgetingService } from '../../services';
import { PurchaseOrder, PurchaseOrderItem, Branch, UserProfile } from '../../models';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  templateUrl: 'purchase-order-create.component.html'
})
export class CreatePurchaseOrderComponent implements OnInit {
  public currentBranch: Branch;
  public user : UserProfile;

  constructor(
    private authService: AuthService,
    private purchaseOrderService: PurchaseOrderService,
    private budgetingServise: BudgetingService,
    private vendorService: VendorService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    
    this.currentBranch = this.authService.getCurrentBranch();
    this.user = this.authService.getCurrentUserProfile();

    this.dataVendor = Observable.create((observer: any) => {
      this.loadingVendor = true;
      this.vendorService.getVendor(this.vendorSelected).then((result: any) => {
        var data = result.data.map(dt => {
          return { id: dt.id, name: dt.name, label: dt.label }
        })
        observer.next(data);
        this.loadingVendor = false;
      })
    });
  }

  public dataVendor: Observable<any>;
  public vendorSelected: string = '';
  public data: PurchaseOrder = new PurchaseOrder();
  public result: PurchaseOrder = new PurchaseOrder();
  public dateRange: Date[] = [new Date(), new Date()];
  public loadingVendor: boolean = false;
  public loading: boolean = false;
  public noResult: boolean;
  public isSelected : boolean = false;
  public isPrinting : boolean = false;
  public totalBill : number = 0;
  public errors = [];

  public budgetingItemTypes : any = [];

  ngOnInit() {
    this.addRow();
    this.getBudgetItemType();
  }

  getBudgetItemType(){
    this.loading = true;
    this.budgetingServise.getBudgetItemType().subscribe( data => {
      this.loading = false;
      this.budgetingItemTypes = data.data;
    }, res =>{
      this.loading = false;
      let error = res.error;
      this.errors = error.errors;
    });
  }

  save(data: PurchaseOrder) {
    this.errors = [];
    this.loading = true;

    this.data.creator = this.user.fullname;
    this.data.startPeriod = this.dateRange[0];
    this.data.endPeriod = this.dateRange[1];
    this.data.branchCode = this.currentBranch.code;
    this.data.grandTotal = 0;
    this.data.purchaseOrderItems.forEach(item =>{
      this.data.grandTotal += item.quantity * item.unitPrice;
    });

    this.purchaseOrderService.create(data)
      .subscribe(res => {
        this.loading = false;
        this.result = res;
        this.toastrService.success(`Success`);
        this.isPrinting = true;       
      }, error => {
        this.loading = false;
        let errors = error.error;
        this.toastrService.error(error.message || 'An error has occurred');
        this.errors = error.errors;
      });
  }

  addRow() {
    this.data.purchaseOrderItems.push(new PurchaseOrderItem());
  }

  deleteRow(index) {
    this.data.purchaseOrderItems.splice(index, 1);
  }

  changeTypeaheadLoading(e: boolean): void {
    this.loadingVendor = e;
    this.data.vendorId = "";
    this.data.vendorName = "";
    this.isSelected = false;
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('Selected value: ', e.value);
  }

  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }

  onSelect(event: TypeaheadMatch): void {
    this.data.vendorId = event.item.id;
    this.data.vendorName = event.item.name;
    this.isSelected = true;
  }
}
