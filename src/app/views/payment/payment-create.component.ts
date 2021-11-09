import { Component, OnInit } from '@angular/core';
import { PaymentService, VendorService, InvoiceService, AuthService } from '../../services';
import { VMPaymentInvoice, Invoice, Branch } from '../../models';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import * as moment from 'moment';
import { element } from '../../../../node_modules/@angular/core/src/render3';

@Component({
  templateUrl: 'payment-create.component.html',
  styleUrls: ['./payment-create.component.scss']
})
export class CreatePaymentComponent implements OnInit {
  public currentBranch: Branch;

  constructor(
    private authService: AuthService,
    private paymentService : PaymentService,
    private vendorService : VendorService,
    private invoiceService : InvoiceService,
    private toastrService: ToastrService,
    private router: Router
  ) { 
    this.currentBranch = this.authService.getCurrentBranch();

    this.dataVendor = Observable.create((observer: any) => {
      this.loadingVendor = true;
      this.vendorService.getVendor(this.vendorSelected).then((result: any) => {
        var data = result.data.map(dt => { 
          return { id: dt.id, name : dt.name, label : dt.label } })
        observer.next(data);
        this.loadingVendor = false;
      })
    });
  }

  public dataVendor: Observable<any>;
  public vendorSelected: string = '';
  public vendorName: string = '';
  public totalBill : number = 0;
  public totalOutstanding : number = 0;
  public paymentInvoices : VMPaymentInvoice[] = [];
  public loadingVendor: boolean = false;
  public loading: boolean = false;
  public loadingInvoice: boolean = false;
  public noResult: boolean;
  public isSelected : boolean = false;
  public errors : string[] = [];

  ngOnInit(){
  }

  getInvoice(vendor){
    this.loadingInvoice = true;

    this.invoiceService.getUnpaid(vendor, this.currentBranch.code).subscribe(res => {
      this.loadingInvoice = false;
      this.totalOutstanding = 0;
      var data = res.data;
      data.forEach(element => {
        var temp = new VMPaymentInvoice();
        this.totalBill = 0;
        element.items.forEach(item => {
          this.totalBill +=  item.totalBill;
        });

        this.paymentInvoices.push({
          isChecked : false,
          invoiceCode : element.code,
          vendorName : element.vendorName,
          transactionDate : new Date,
          invoiceDate : new Date(moment.utc(element.createdDate).local().format('YYYY-MM-DD HH:mm')),
          totalBill : this.totalBill,
          paidAmount : 0,
          remainingAmount : element.remainingAmount,
          message : ""
        });
      });

      this.paymentInvoices.forEach(element => {
        this.totalOutstanding += element.remainingAmount;
      });

    }, res =>{
      this.loadingInvoice = false;
      let error = res.error;
    });
  }

  save(paymentInvoices) {
    this.loading = true;
    if(this.validate(paymentInvoices)){
      
      paymentInvoices = this.paymentInvoices;
      
      this.paymentService.create(this.currentBranch.code, paymentInvoices)
        .subscribe(res => {
          this.loading = false;
          if(res.message != "Success")
          {
            this.toastrService.error(res.message);
          }
  
          this.toastrService.success(`Success`);
          this.router.navigate(['invoice/list']);
        }, res => {
          this.loading = false;
          let error = res.error;
          this.toastrService.error(error.message || 'An error has occurred');
          this.errors = error.errors;
        });
    }
  }

  changeTypeaheadLoading(e: boolean): void {
    this.loadingVendor = e;
    this.vendorName = "";
    this.paymentInvoices = [];
    this.totalOutstanding = 0;
    this.isSelected = false;
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('Selected value: ', e.value);
  }

  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }

  onSelect(event: TypeaheadMatch): void {
    this.vendorName = event.item.name;
    this.isSelected = true;
    this.getInvoice(this.vendorName);
  }
  
  openDetail(code) {
    this.router.navigate([`/payment/create/${code}`]);
  }  

  validate(paymentInvoices){
    this.errors = [];
    var list = paymentInvoices.filter(x => x.isChecked);
    if(list.length == 0)
    {
      this.loading = false;
      this.toastrService.error("Belum ada invoice yang dipilih");
      return false;
    }
    
    list.forEach(element => {
      if (element.paidAmount == 0)
        this.errors.push(element.invoiceCode);

      if (element.remainingAmount == 0)
      {
        if(element.paidAmount > element.totalBill)
        this.errors.push(element.invoiceCode);
      }else{
        if(element.paidAmount > element.remainingAmount)
        this.errors.push(element.invoiceCode)
      }
    });

    if(this.errors.length > 0)
    {
      this.errors.forEach(element => {
        this.toastrService.error("Invalid payment invoice : " + element);
      });

      this.loading = false;
      return false;
    }else{
      this.paymentInvoices = list;
      return true;
    }
  }
}
