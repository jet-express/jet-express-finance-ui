import { Component, OnInit } from '@angular/core';
import { PageQuery } from '../../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { Budget, Branch } from '../../../models';
import { BudgetingService, AuthService } from '../../../services';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-budgeting-list',
  templateUrl: './budgeting-list.component.html',
  styleUrls: ['./budgeting-list.component.scss']
})
export class BudgetingListComponent implements OnInit {
  public currentBranch: Branch;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService,
    private budgetingServise: BudgetingService,
    private route: ActivatedRoute
  ) { 
    this.currentBranch = this.authService.getCurrentBranch(); 
  }

  public path : string = "";
  public errors = [];
  public loading: boolean = false;
  public budgets: Budget[] = [];
  public pageQuery: PageQuery = new PageQuery();
  public selectedStatus: string = "";
  public statusList = [
    "Created",
    "Approved",
    "Rejected"
  ];

  ngOnInit() {
    this.path = this.route.snapshot.routeConfig.path;
    this.pageQuery.asc = false;
    if (this.path == "list")
      this.getAllBudget(this.pageQuery);
    else
      this.getCreatedBudget(this.pageQuery);
  }

  getAllBudget(pageQuery: PageQuery){
    this.loading = true;
    this.budgetingServise.getAll(this.currentBranch.code, pageQuery).subscribe(data =>{
      this.loading = false;
      this.budgets = data.data;
      this.pageQuery = data.query;
      this.budgets.forEach(element => {
        element.createdDate = new Date(moment.utc(element.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
      });
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(error.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

  getCreatedBudget(pageQuery: PageQuery){
    this.loading = true;
    this.budgetingServise.getCreated(this.currentBranch.code, pageQuery).subscribe(data =>{
      this.loading = false;
      this.budgets = data.data;
      this.pageQuery = data.query;
      this.budgets.forEach(element => {
        element.createdDate = new Date(moment.utc(element.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
      });
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(error.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

  getApprovedBudget(pageQuery: PageQuery){
    this.loading = true;
    this.budgetingServise.getApproved(this.currentBranch.code, pageQuery).subscribe(data =>{
      this.loading = false;
      this.budgets = data.data;
      this.pageQuery = data.query;
      this.budgets.forEach(element => {
        element.createdDate = new Date(moment.utc(element.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
      });
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(error.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

  getRejectedBudget(pageQuery: PageQuery){
    this.loading = true;
    this.budgetingServise.getRejected(this.currentBranch.code, pageQuery).subscribe(data =>{
      this.loading = false;
      this.budgets = data.data;
      this.pageQuery = data.query;
      this.budgets.forEach(element => {
        element.createdDate = new Date(moment.utc(element.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
      });
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(error.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

  pageChanged(event: any) {
    this.pageQuery.page = event.page;
    this.filterByStatus();
  }
  
  search() {
    this.pageQuery.page = 1;
    this.filterByStatus();
  }

  filterByStatus(){
    if (this.selectedStatus == "Created" || this.path != "list")
      this.getCreatedBudget(this.pageQuery);
    else if (this.selectedStatus == "Approved")
      this.getApprovedBudget(this.pageQuery);
    else if (this.selectedStatus == "Rejected")
      this.getRejectedBudget(this.pageQuery);
    else
      this.getAllBudget(this.pageQuery);
  }
  
  openDetail(item: Budget) {
    if (this.path == "list")
      this.router.navigate([`/budgeting/detail/${item.code}`]);
    else
      this.router.navigate([`/budgeting/approve/${item.code}`]);
  }

}
