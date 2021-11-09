import { Component, OnInit } from '@angular/core';
import { PageQuery, WaybillDeposit, Branch } from '../../../models';
import { CashInService, AuthService } from '../../../services';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  public currentBranch: Branch;

  constructor(
    private authService : AuthService,
    private toastrService: ToastrService,
    private cashInService : CashInService
  ) { 
    this.currentBranch = this.authService.getCurrentBranch();  
  }

  public pageQuery: PageQuery = new PageQuery();
  public loading : boolean = false;
  public waybillDepositList : WaybillDeposit[] = [];
  public errors = [];

  ngOnInit() {
    this.pageQuery.asc = false;
    this.getData(this.pageQuery);
  }

  search(){
    this.pageQuery.page = 1;
    this.pageQuery.date = moment.utc(this.pageQuery.date).local().format('MM/DD/YYYY HH:mm:ss');
    this.getData(this.pageQuery);
  }

  pageChanged(event: any) {
    this.pageQuery.page = event.page;
    this.getData(this.pageQuery);
  }

  getData(pageQuery : PageQuery){
    this.loading = true;
    this.cashInService.getDeposited(this.currentBranch.code, pageQuery).subscribe(data => {
      this.loading = false;
      this.waybillDepositList = data.data;
      this.waybillDepositList.forEach(element => {
        element.transactionDate = new Date(moment.utc(element.transactionDate).local().format('YYYY-MM-DD HH:mm:ss'));
      });
      this.pageQuery = data.query;
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(errors.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

}
