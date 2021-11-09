import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BudgetingService, AuthService } from '../../../services';
import { Branch, } from '../../../models';
import { BudgetHandover} from '../../../models/budget-handover';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journal-create',
  templateUrl: './journal-create.component.html',
  styleUrls: ['./journal-create.component.scss']
})
export class JournalCreateComponent implements OnInit {
  public currentBranch: Branch;

  constructor(
    private authService: AuthService,
    private budgetingServise: BudgetingService,
    private toastrService: ToastrService,
    private router: Router
  ) { 
    this.currentBranch = this.authService.getCurrentBranch();
  }

  public loading: boolean = false;
  public isShow: boolean = false;
  public data: BudgetHandover = new BudgetHandover();
  public dateNow = new Date(); 
  public weeks: string[] = ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4", "Minggu 5"];
  public months: string[] = moment.months();
  public years: number[] = [];

  ngOnInit() {
    this.showYear();
  }

  getData() {
    if (this.data.year && this.data.month && this.data.week) {
      this.loading = true;
      this.isShow = false;
      this.budgetingServise.getBudget(this.currentBranch.code, this.data.week, this.data.month, this.data.year)
        .subscribe(data => {
          this.loading = false;
          this.isShow = true;
          this.data.createdDate = new Date(moment.utc(data.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
          this.data.createdBy = data.creator;
          this.data.amount = data.total;
          this.data.branchCode = this.currentBranch.code;
        }, error => {
          this.loading = false;
          this.toastrService.error(error.error.message || error.message);
        }
      );
    }
  }

  save(data : BudgetHandover){
    this.loading = true;
    this.budgetingServise.createBudgetHandover(data).subscribe(res => {
      this.loading = false;
      this.toastrService.success(`Success`);
      this.router.navigate([`/budgeting/journal-list`]);    
    }, error =>{
      this.loading = false;
      this.toastrService.error(error.error.message || 'An error has occurred');
    });
  }

  showYear(){   
    let current = moment();
    var years = current.year();
    
    for (let i = years; i <= years + 2; i++) {
      this.years.push(i);
    }
  }

}
