import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BudgetingService } from '../../../services';
import { BudgetHandover } from '../../../models/budget-handover';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-journal-detail',
  templateUrl: './journal-detail.component.html',
  styleUrls: ['./journal-detail.component.scss']
})
export class JournalDetailComponent implements OnInit {
  private code: string;

  constructor(
    private router: Router,
    private budgetingServise: BudgetingService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { 
    let params = this.activatedRoute.snapshot.params;
    this.code = params.code;
  }

  public data : BudgetHandover = new BudgetHandover();
  public loading: boolean = false;
  public errors =[];

  ngOnInit() {
    this.getData(this.code);
  }

  getData(code: string){
    this.loading = true;
    this.budgetingServise.getJournal(code).subscribe(res => {
      this.loading = false;
      this.data = res;
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(error.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }
  
  back() {
    this.router.navigate([`/budgeting/journal-list`]);
  }

}
