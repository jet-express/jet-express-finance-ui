import { Component, OnInit } from '@angular/core';
import { PaymentService, VendorService, AuthService } from '../../services';
import { VMPaymentInvoice, PageQuery, Branch } from '../../models';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import * as moment from 'moment';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {
  public currentBranch: Branch;

  constructor(
    private authService: AuthService,
    private paymentService : PaymentService,
    private vendorService : VendorService,
    private toastrService: ToastrService
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
  public dateRange: Date[] = [new Date(), new Date()];
  public vendorSelected: string = '';
  public loadingVendor: boolean = false;
  public loading: boolean = false;
  public isShow: boolean = false;
  public noResult: boolean;
  public isSelected : boolean = false;
  public vendorName : string= "";
  public data : VMPaymentInvoice[] = [];
  public pageQuery: PageQuery = new PageQuery();
  public startDate : any;
  public endDate : any;
  public errors = [];

  ngOnInit(){
  }

  getData(){
    this.pageQuery.asc = false;
    this.pageQuery.page = 1;
    this.getHistory(this.pageQuery);
  }

  getHistory(pageQuery: PageQuery) {
    this.errors = [];
    this.loading = true;
    this.startDate = moment.utc(this.dateRange[0]).local().format('MM/DD/YYYY');
    this.endDate = moment.utc(this.dateRange[1]).local().format('MM/DD/YYYY');
    this.paymentService.getHistory(this.currentBranch.code ,this.startDate, this.endDate, pageQuery)
      .subscribe(res => {
        this.loading = false;
        this.isShow = true;
        this.data = res.data;
        this.pageQuery = res.query;
        this.data.forEach(element => {
            element.transactionDate = new Date(moment.utc(element.transactionDate).local().format('YYYY-MM-DD HH:mm:ss'));
        });
      }, res => {
        this.loading = false;
        let error = res.error;
        this.toastrService.error(error.message || 'An error has occurred');
        this.errors = error.errors;
      });
  } 

  changeTypeaheadLoading(e: boolean): void {
    this.loadingVendor = e;
    this.pageQuery.keyword = "";
    this.isSelected = false;
    this.isShow = false;
    this.pageQuery = new PageQuery();
    this.data = [];
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('Selected value: ', e.value);
  }

  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }

  onSelect(event: TypeaheadMatch): void {
    this.isSelected = true;
    this.pageQuery.keyword = event.item.name;
  }


  pageChanged(event: any) {
    this.pageQuery.page = event.page;

    this.getHistory(this.pageQuery);
  }
}
