import { Component, OnInit } from '@angular/core';
import { PageQuery, CashDeposit, Branch, CashDepositItem } from '../../../models';
import { CashInService, AuthService } from '../../../services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-deposit-payment',
  templateUrl: './deposit-payment.component.html',
  styleUrls: ['./deposit-payment.component.scss']
})
export class DepositPaymentComponent implements OnInit {
  public currentBranch: Branch;

  constructor(
    private router: Router,
    private authService : AuthService,
    private toastrService: ToastrService,
    private cashInService : CashInService
  ) {
    this.currentBranch = this.authService.getCurrentBranch();   
  }

  public pageQuery: PageQuery = new PageQuery();
  public cashDepositList : CashDeposit[]= [];
  public loading : boolean = false;
  public selectedStatus = "";
  public errors = [];

  ngOnInit() {
    this.filterByStatus();
  }

  filterByStatus(){
    this.pageQuery.asc = false;
    if(this.selectedStatus == "Created")
      this.getCreated(this.pageQuery);
    else if(this.selectedStatus == "Approved")
      this.getApproved(this.pageQuery);
    else if(this.selectedStatus == "Rejected")
      this.getRejected(this.pageQuery);
    else
      this.getAll(this.pageQuery);
  }

  getAll(pageQuery : PageQuery){
    this.loading = true;
    this.cashInService.getAllCashDeposit(this.currentBranch.code, pageQuery).subscribe(data => {
      this.loading = false;
      this.cashDepositList = data.data;
      this.pageQuery = data.query;
      this.cashDepositList.forEach(element => {
        element.createdDate = new Date(moment.utc(element.createdDate).local().format('YYYY-MM-DD HH:mm:s'));
      });
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

  getCreated(pageQuery : PageQuery){
    this.loading = true;
    this.cashInService.getCreatedCashDeposit(this.currentBranch.code, pageQuery).subscribe(data => {
      this.loading = false;
      this.cashDepositList = data.data;
      this.pageQuery = data.query;
      this.cashDepositList.forEach(element => {
        element.createdDate = new Date(moment.utc(element.createdDate).local().format('YYYY-MM-DD HH:mm:s'));
      });
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

  getApproved(pageQuery : PageQuery){
    this.loading = true;
    this.cashInService.getApprovedCashDeposit(this.currentBranch.code, pageQuery).subscribe(data => {
      this.loading = false;
      this.cashDepositList = data.data;
      this.pageQuery = data.query;
      this.cashDepositList.forEach(element => {
        element.createdDate = new Date(moment.utc(element.createdDate).local().format('YYYY-MM-DD HH:mm:s'));
      });
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

  getRejected(pageQuery : PageQuery){
    this.loading = true;
    this.cashInService.getRejectedCashDeposit(this.currentBranch.code, pageQuery).subscribe(data => {
      this.loading = false;
      this.cashDepositList = data.data;
      this.pageQuery = data.query;
      this.cashDepositList.forEach(element => {
        element.createdDate = new Date(moment.utc(element.createdDate).local().format('YYYY-MM-DD HH:mm:s'));
      });
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

  pageChanged(event: any) {
    this.pageQuery.page = event.page;
    this.filterByStatus();
  }

  openDetail(item : CashDeposit){
    this.router.navigate([`/cash-in/detail/${item.code}`]);
  }

}
