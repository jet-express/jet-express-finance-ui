import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  // ApiResponse,
  ApiResponseQuery,
  PageQuery,
} from '../models';

import { Budget } from '../models/budget';
import { BudgetHandover } from '../models/budget-handover';
import { BudgetItemType } from '../models/budget-item-type';


@Injectable({
  providedIn: 'root'
})
export class BudgetingService {
  constructor(
    private httpClient: HttpClient
  ) { }  


  approve(code : string , data: Budget): Observable<Budget> {
    return this.httpClient.post<Budget>(`${environment.apiUrl}/v1/budget/${code}/approve`, data);
  }
  
  reject(code : string , data: Budget): Observable<Budget> {
    return this.httpClient.post<Budget>(`${environment.apiUrl}/v1/budget/${code}/reject`, data);
  }

  create(data: Budget): Observable<Budget> {
    return this.httpClient.post<Budget>(`${environment.apiUrl}/v1/budget/create`,data);
  } 
  
  createBudgetHandover(data: BudgetHandover): Observable<BudgetHandover> {
    return this.httpClient.post<BudgetHandover>(`${environment.apiUrl}/v1/budget-handover/create`,data);
  } 
  
  get(code: string): Observable<Budget> {
    return this.httpClient.get<Budget>(`${environment.apiUrl}/v1/budget/${code}`);
  }

  getJournal(code: string): Observable<BudgetHandover> {
    return this.httpClient.get<BudgetHandover>(`${environment.apiUrl}/v1/budget-handover/${code}`);
  }
  
  getAll(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<Budget>> {
    return this.httpClient.get<ApiResponseQuery<Budget>>(`${environment.apiUrl}/v1/budget/all/${branchCode}`,{ params: pageQuery });
  }
  
  getAllJournal(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<BudgetHandover>> {
    return this.httpClient.get<ApiResponseQuery<BudgetHandover>>(`${environment.apiUrl}/v1/budget-handover/all/${branchCode}`,{ params: pageQuery });
  }

  getBudget(branchCode : string, week: string, month: string, year: number): Observable<BudgetHandover> {
    return this.httpClient.get<BudgetHandover>(`${environment.apiUrl}/v1/budget/weekly/${week}/${branchCode}?year=${year}&month=${month}`);
  }
  
  getCreated(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<Budget>> {
    return this.httpClient.get<ApiResponseQuery<Budget>>(`${environment.apiUrl}/v1/budget/created/${branchCode}`,{ params: pageQuery });
  }
  
  getApproved(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<Budget>> {
    return this.httpClient.get<ApiResponseQuery<Budget>>(`${environment.apiUrl}/v1/budget/approved/${branchCode}`,{ params: pageQuery });
  }

  getRejected(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<Budget>> {
    return this.httpClient.get<ApiResponseQuery<Budget>>(`${environment.apiUrl}/v1/budget/rejected/${branchCode}`,{ params: pageQuery });
  }
  
  getBudgetItemType(): Observable<ApiResponseQuery<BudgetItemType>> {
    return this.httpClient.get<ApiResponseQuery<BudgetItemType>>(`${environment.apiUrl}/v1/budget-item-type/all`);
  }
}
