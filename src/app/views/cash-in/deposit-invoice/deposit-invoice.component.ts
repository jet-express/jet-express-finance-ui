import { Component, OnInit } from '@angular/core';
import { PageQuery, CashDeposit, Branch, CashDepositItem, WaybillDeposit } from '../../../models';
import { CashInService, AuthService } from '../../../services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { element } from '../../../../../node_modules/@angular/core/src/render3';

@Component({
  selector: 'app-deposit-invoice',
  templateUrl: './deposit-invoice.component.html',
  styleUrls: ['./deposit-invoice.component.scss']
})
export class DepositInvoiceComponent implements OnInit {
  public currentBranch: Branch;

  constructor(
    private authService : AuthService,
    private toastrService: ToastrService,
    private cashInService : CashInService,
    private router: Router
  ) { 
    this.currentBranch = this.authService.getCurrentBranch();  
  }

  public loading : boolean = false;
  public waybillDepositList : WaybillDeposit[] = [];
  public defaultWaybillDepositList : WaybillDeposit[] = [];
  public errors = [];
  public selectedType: string = "Cash Outlet"; 
  public keyword: string = ""; 
  public date : Date = new Date();
  public totalWaybill = 0;
  public grandTotal = 0;
  public totalAmount = 0;

  ngOnInit() {
    this.filterByType();
  }

  filterByType(){
    this.grandTotal = 0;
    this.totalWaybill = 0;
    this.waybillDepositList = [];
    if(this.selectedType == "Cash Outlet")
      this.getCashOutlet();
    else if(this.selectedType == "Kredit T+2")
      this.getCredit();
    else
      this.getCOD();
  }

  getCashOutlet(){
    this.loading = true;
    this.cashInService.getCashOutlet(this.currentBranch.code).subscribe(data => {
      this.loading = false;
      this.waybillDepositList = data.data;
      this.defaultWaybillDepositList = data.data;
      this.totalAmount = 0;
      this.waybillDepositList.forEach(element => {
        element.transactionDate = new Date(moment.utc(element.transactionDate).local().format('YYYY-MM-DD HH:mm:ss'));
        this.totalAmount += element.amount;
      });
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

  getCOD(){
    this.loading = true;
    this.cashInService.getCod(this.currentBranch.code).subscribe(data => {
      this.loading = false;
      this.waybillDepositList = data.data;
      this.defaultWaybillDepositList = data.data;
      this.totalAmount = 0;
      this.waybillDepositList.forEach(element => {
        element.transactionDate = new Date(moment.utc(element.transactionDate).local().format('YYYY-MM-DD HH:mm:ss'));
        element.deliveryDate = new Date(moment.utc(element.deliveryDate).local().format('YYYY-MM-DD HH:mm:ss'));
        element.waybillType = element.code.substring(0,3);
        this.totalAmount += element.amount;
      });
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

  getCredit(){
    this.loading = true;
    this.cashInService.getCredit(this.currentBranch.code).subscribe(data => {
      this.loading = false;
      this.waybillDepositList = data.data;
      this.defaultWaybillDepositList = data.data;
      this.totalAmount = 0;
      this.waybillDepositList.forEach(element => {
        element.transactionDate = new Date(moment.utc(element.transactionDate).local().format('YYYY-MM-DD HH:mm:ss'));
        this.totalAmount += element.amount;
      });
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

  searchByDate(){
    this.waybillDepositList = [];
    let selectedDate = moment.utc(this.date).local().format('YYYY-MM-DD');
    this.defaultWaybillDepositList.forEach(element => {
      let transactionDate = moment.utc(element.transactionDate).local().format('YYYY-MM-DD');
      if(transactionDate == selectedDate){
        this.waybillDepositList.push(element);
      }
    });
  }

  searchAwbNumber() {
    if (this.keyword != "") {
      this.waybillDepositList.forEach(element => {
        if (element.awbNumber == this.keyword.trim()) {
          element.isChecked = true;
          this.toastrService.success(`Waybill `+ this.keyword.trim() +` Ditemukan`);
        }
      });
    }
  }

  countTotal(){
    this.totalWaybill = 0;
    this.grandTotal = 0;
    this.waybillDepositList.forEach(element => {
      if(element.isChecked){
        this.totalWaybill += 1;
        this.grandTotal += element.amount;
      }
    });
  }

  save(){
    this.loading = true;
    let listOfAwb = [];
    this.waybillDepositList.forEach(element => {
      if(element.isChecked === true)
        listOfAwb.push(element.awbNumber);
    });
    
    this.cashInService.save(this.currentBranch.code, listOfAwb).subscribe(res => {
      this.loading = false;
      this.toastrService.success(`Success`);
      this.router.navigate([`/cash-in/summary`]);    
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(error.error.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

}
