import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Budget, VMBudgetItem, BudgetItem } from '../../../models';
import { BudgetingService } from '../../../services';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-budgeting-detail',
  templateUrl: './budgeting-detail.component.html',
  styleUrls: ['./budgeting-detail.component.scss']
})
export class BudgetingDetailComponent implements OnInit {
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

  public data : Budget = new Budget();
  public path : string = "";
  public errors = [];
  public loading: boolean = false;
  public totalWeek1: number;
  public totalWeek2: number;
  public totalWeek3: number;
  public totalWeek4: number;
  public totalWeek5: number;
  public grandTotal: number;
  public budgetingItemTypes : any;

  ngOnInit() {
    this.path = this.activatedRoute.snapshot.routeConfig.path;
    this.getBudgetItemType();
    this.getData(this.code);
  }

  getData(code : string){
    this.loading = true;
    this.budgetingServise.get(code).subscribe(res => {
      this.loading = false;
      this.data = res;
      this.data.createdDate = new Date(moment.utc(res.createdDate).local().format('YYYY-MM-DD HH:mm:ss'));
      this.setVmBudgetItems();
    },error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(error.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }
  

  getBudgetItemType(){
    this.loading = true;
    this.budgetingServise.getBudgetItemType().subscribe( data => {
      this.loading = false;
      this.budgetingItemTypes = data.data;
    }, res =>{
      this.loading = false;
      let error = res.error;
      this.errors = error.errors;
    });
  }

  approveData(){
    this.loading = true;
    this.budgetingServise.approve(this.code, this.data).subscribe(data => {
      this.loading = false;
      this.toastrService.success(`Success Approve`);
      this.router.navigate(['/budgeting/list-approve']);
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(error.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

  rejectData(){
    this.loading = true;
    this.budgetingServise.reject(this.code, this.data).subscribe(data => {
      this.loading = false;
      this.toastrService.success(`Success Reject`);
      this.router.navigate(['/budgeting/list']);
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(error.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

  setVmBudgetItems(){
    var orderVmBudgetItemsById = [];
    this.data.vmBudgetItems = [];
    this.data.budgetItems.forEach(element => {
      if(this.data.vmBudgetItems.length > 0){
        var data = this.data.vmBudgetItems.filter(x => x.budgetType == element.type);
        if(data.length > 0){
          this.setAmountWeek(data[0], element);
        }else{
              var budgetItem = new VMBudgetItem();
              budgetItem.budgetType = element.type;
              var result = this.setAmountWeek(budgetItem, element);
              this.data.vmBudgetItems.push(result);
        }
      } else {
        var budgetItem = new VMBudgetItem();
        budgetItem.budgetType = element.type;
        var result = this.setAmountWeek(budgetItem, element);
        this.data.vmBudgetItems.push(result);
      }
    });
    this.totalWeek1 = 0;
    this.totalWeek2 = 0;
    this.totalWeek3 = 0;
    this.totalWeek4 = 0;
    this.totalWeek5 = 0;
    this.data.vmBudgetItems.forEach(element => {
      element.week1 = element.week1 ? element.week1 : 0;
      element.week2 = element.week2 ? element.week2 : 0;
      element.week3 = element.week3 ? element.week3 : 0;
      element.week4 = element.week4 ? element.week4 : 0;
      element.week5 = element.week5 ? element.week5 : 0;
      element.typeSum = element.week1 + element.week2 + element.week3 + element.week4 + element.week5;
      this.totalWeek1 += element.week1;
      this.totalWeek2 += element.week2;
      this.totalWeek3 += element.week3;
      this.totalWeek4 += element.week4;
      this.totalWeek5 += element.week5;
    });    
    this.grandTotal = this.totalWeek1 + this.totalWeek2 + this.totalWeek3 + this.totalWeek4 + this.totalWeek5;
    this.budgetingItemTypes.forEach(element => {
      this.data.vmBudgetItems.forEach(element2 => {
        if(element.name == element2.budgetType)
          orderVmBudgetItemsById.push(element2);
      })
    });
    this.data.vmBudgetItems = orderVmBudgetItemsById;
  }
  

  setAmountWeek(item, element){
    if (element.week == "Minggu 1")
      item.week1 = element.amount;
    else if(element.week == "Minggu 2")
      item.week2 = element.amount;
    else if(element.week == "Minggu 3")
      item.week3 = element.amount;
    else if(element.week == "Minggu 4")
      item.week4 = element.amount;
    else
      item.week5 = element.amount;
    
    return item;
  }
  
  back() {
    if (this.path == "detail/:code")
      this.router.navigate([`/budgeting/list`]);
    else
      this.router.navigate([`/budgeting/list-approve`]);
  }

}
