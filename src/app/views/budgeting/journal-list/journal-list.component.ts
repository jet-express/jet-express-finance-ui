import { Component, OnInit } from '@angular/core';
import { PageQuery } from '../../../models';
import { Router } from '@angular/router';
import { Branch } from '../../../models';
import { BudgetHandover } from '../../../models/budget-handover';
import { BudgetingService, AuthService } from '../../../services';
import * as moment from 'moment';

@Component({
  selector: 'app-journal-list',
  templateUrl: './journal-list.component.html',
  styleUrls: ['./journal-list.component.scss']
})
export class JournalListComponent implements OnInit {
  public currentBranch: Branch;

  constructor(
    private authService: AuthService,
    private budgetingServise: BudgetingService,
    private router: Router
  ) { 
    this.currentBranch = this.authService.getCurrentBranch(); 
  }
  
  public loading: boolean = false;
  public pageQuery: PageQuery = new PageQuery();
  public budgetHandovers : BudgetHandover[] = [];
  
  ngOnInit() {
    this.pageQuery.asc = false;
    this.getAll(this.pageQuery)
  }

  getAll(pageQuery: PageQuery){
    this.loading = true;
    this.budgetingServise.getAllJournal(this.currentBranch.code, pageQuery).subscribe(res => {
      this.loading = false;
      this.budgetHandovers = res.data;
      this.pageQuery = res.query;
      this.budgetHandovers.forEach(element => {
        element.createdDate = new Date(moment.utc(element.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
      });
    })
  }

  openDetail(item: BudgetHandover) {
    this.router.navigate([`/budgeting/journal-detail/${item.code}`]);
  }

  pageChanged(event: any) {
    this.pageQuery.page = event.page;
  }

}
