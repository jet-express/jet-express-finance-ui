import { Component, OnInit } from '@angular/core';
import { Branch, UserProfile, Budget, BudgetItem, VMBudgetItem } from '../../../models';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BudgetingService, AuthService } from '../../../services';

@Component({
  selector: 'app-budgeting-create',
  templateUrl: './budgeting-create.component.html',
  styleUrls: ['./budgeting-create.component.scss']
})
export class BudgetingCreateComponent implements OnInit {
  public currentBranch: Branch;
  public currentUser: UserProfile;

  constructor(
    private authService: AuthService,
    private budgetingServise: BudgetingService,
    private toastrService: ToastrService,
    private router: Router
  ) {     
    this.currentBranch = this.authService.getCurrentBranch();
    this.currentUser = this.authService.getCurrentUserProfile();
  }

  public loading: boolean = false;
  public data : Budget = new Budget();
  public result: Budget = new Budget();
  public months: string[] = moment.months();
  public years: number[] = [];
  public selectedYear : string = "";
  public errors = [];
  public isClear: boolean = false;
  public totalWeek1 : number = 0;
  public totalWeek2 : number = 0;
  public totalWeek3 : number = 0;
  public totalWeek4 : number = 0;
  public totalWeek5 : number = 0;
  public grandTotal : number = 0;
  public budgetingItemTypes : any;

  ngOnInit() {
    this.addRow();
    this.showYear();
    this.getBudgetItemType();
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

  save(data : Budget){
    this.loading = true;
    this.errors = [];
    this.data.budgetItems = [];
    this.data.year = Number(this.selectedYear);
    this.data.branchCode = this.currentBranch.code;
    this.data.createdBy = this.currentUser.username;
    this.data.vmBudgetItems.forEach(element => {
      this.setBudgetItems(element);
    });

    this.budgetingServise.create(data).subscribe(res => {
      this.loading = false;
      this.result = res;
      this.result.vmBudgetItems = this.data.vmBudgetItems;
      this.toastrService.success(`Success`);
      this.router.navigate([`/budgeting/list`]);    
    }, error => {
      this.loading = false;
      let errors = error.error;
      this.toastrService.error(error.error.message || 'An error has occurred');
      this.errors = error.errors;
    });
  }

  countSum(){
    this.totalWeek1 = 0;
    this.totalWeek2 = 0;
    this.totalWeek3 = 0;
    this.totalWeek4 = 0;
    this.totalWeek5 = 0;
    this.data.vmBudgetItems.forEach(element => {
      var week1 = element.week1 ? element.week1 : 0;
      var week2 = element.week2 ? element.week2 : 0;
      var week3 = element.week3 ? element.week3 : 0;
      var week4 = element.week4 ? element.week4 : 0;
      var week5 = element.week5 ? element.week5 : 0;
      element.typeSum =  week1 + week2 + week3 + week4 + week5;
      this.totalWeek1 += week1;
      this.totalWeek2 += week2;
      this.totalWeek3 += week3;
      this.totalWeek4 += week4;
      this.totalWeek5 += week5;
    });

    this.grandTotal = this.totalWeek1 + this.totalWeek2 + this.totalWeek3 + this.totalWeek4 + this.totalWeek5;
  }

  showYear() {
    let current = moment();
    var years = current.year();

    for (let i = years ; i <= years + 2; i++) {
      this.years.push(i);
    }
  }

  addRow() {
    this.data.vmBudgetItems.push(new VMBudgetItem());
  }

  deleteRow(index) {
    this.data.vmBudgetItems.splice(index, 1);
    this.errors.splice(index, 1);
    this.validateSave();
  }

  validateBudgetTypeItem(type, index){
    this.errors[index]="";
    var data = this.data.vmBudgetItems.filter(x => x.budgetType == type);
    if(data.length > 1){
      this.errors[index]="*Keperluan sudah dipilih";
    }
    this.validateSave();
  }

  validateSave(){
    this.isClear = false;
    var data = this.errors.filter(x => x != "");
    if(data.length > 0){
      this.isClear = true;
    }
  }

  setBudgetItems(element : VMBudgetItem){
    if(element.week1){
      var item = new BudgetItem();
      item.type = element.budgetType;
      item.week = "Minggu 1";
      item.amount = element.week1;
      this.data.budgetItems.push(item);
    }      
    if(element.week2){
      var item = new BudgetItem();
      item.type = element.budgetType;
      item.week = "Minggu 2";
      item.amount = element.week2;
      this.data.budgetItems.push(item);
    }
    if(element.week3){
      var item = new BudgetItem();
      item.type = element.budgetType;
      item.week = "Minggu 3";
      item.amount = element.week3;
      this.data.budgetItems.push(item);
    }
    if(element.week4){
      var item = new BudgetItem();
      item.type = element.budgetType;
      item.week = "Minggu 4";
      item.amount = element.week4;
      this.data.budgetItems.push(item);
    }
    if(element.week5){
      var item = new BudgetItem();
      item.type = element.budgetType;
      item.week = "Minggu 5";
      item.amount = element.week5;
      this.data.budgetItems.push(item);
    }
  }
}
