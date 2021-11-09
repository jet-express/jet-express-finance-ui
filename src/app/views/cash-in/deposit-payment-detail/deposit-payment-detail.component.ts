import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CashInService, AuthService } from '../../../services';
import { CashDeposit } from '../../../models';
import * as moment from 'moment';

@Component({
  selector: 'app-deposit-payment-detail',
  templateUrl: './deposit-payment-detail.component.html',
  styleUrls: ['./deposit-payment-detail.component.scss']
})
export class DepositPaymentDetailComponent implements OnInit {
  private code: string;
  public currentAccessRoles: string[] = [];
  public isFinanceHQ : boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cashInService : CashInService,
    private toastrService: ToastrService,
    private activatedRoute : ActivatedRoute
  ) {
    let params = this.activatedRoute.snapshot.params;
    this.code = params.code; 
    this.currentAccessRoles = this.authService.getCurrentAccessRoles();
    this.isFinanceHQ = this.currentAccessRoles.includes("Finance HQ");
  }
  public loading : boolean = false;
  public data: CashDeposit;
  public errors = [];

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.loading = true;
    this.cashInService.getDetail(this.code).subscribe(res =>{
      this.loading = false;
      this.data = res;
      this.data.createdDate = new Date(moment.utc(this.data.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
      this.data.cashDepositItems.forEach(element =>{
        element.transactionDate = new Date(moment.utc(element.transactionDate).local().format('YYYY-MM-DD HH:mm:ss'));
      });
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

  reject(){
    this.loading = true;
    this.cashInService.reject(this.code, this.data).subscribe(res =>{
      this.loading = false;
      this.data = res;
      this.data.createdDate = new Date(moment.utc(this.data.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
      this.data.cashDepositItems.forEach(element =>{
        element.transactionDate = new Date(moment.utc(element.transactionDate).local().format('YYYY-MM-DD HH:mm:ss'));
      });
    this.toastrService.success(`Success`);
    this.back();
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

  approve(){
    this.loading = true;
    this.cashInService.approve(this.code, this.data).subscribe(res =>{
      this.loading = false;
      this.data = res;
      this.data.createdDate = new Date(moment.utc(this.data.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
      this.data.cashDepositItems.forEach(element =>{
        element.transactionDate = new Date(moment.utc(element.transactionDate).local().format('YYYY-MM-DD HH:mm:ss'));
      });
    this.toastrService.success(`Success`);
    this.back();
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

  back(){
    this.router.navigate([`/cash-in/deposit-payment`]);
  }

}
