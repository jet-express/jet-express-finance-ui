import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  // ApiResponse,
  ApiResponseQuery,
  PageQuery,
  CashDeposit,
} from '../models';

import { WaybillDeposit, CashDepositItem } from '../models';


@Injectable({
  providedIn: 'root'
})
export class CashInService {
  constructor(
    private httpClient: HttpClient
  ) { } 
   
  save(branchCode : string , awbNumbers: string[]): Observable<WaybillDeposit> {
    return this.httpClient.post<WaybillDeposit>(`${environment.apiUrl}/v1/waybill-deposit/deposit/${branchCode}`, awbNumbers);
  }

  getCashOutlet(branchCode : string): Observable<ApiResponseQuery<WaybillDeposit>> {
    return this.httpClient.get<ApiResponseQuery<WaybillDeposit>>(`${environment.apiUrl}/v1/waybill-deposit/cash-non-cod/${branchCode}`);
  }

  getCod(branchCode : string): Observable<ApiResponseQuery<WaybillDeposit>> {
    return this.httpClient.get<ApiResponseQuery<WaybillDeposit>>(`${environment.apiUrl}/v1/waybill-deposit/cash-cod/${branchCode}`);
  }
  
  getCredit(branchCode : string): Observable<ApiResponseQuery<WaybillDeposit>> {
    return this.httpClient.get<ApiResponseQuery<WaybillDeposit>>(`${environment.apiUrl}/v1/waybill-deposit/credit/${branchCode}`);
  }
  
  getDeposited(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<WaybillDeposit>> {
    return this.httpClient.get<ApiResponseQuery<WaybillDeposit>>(`${environment.apiUrl}/v1/waybill-deposit/deposited/${branchCode}`,{ params: pageQuery });
  }

  getAllCashDeposit(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<CashDeposit>> {
    return this.httpClient.get<ApiResponseQuery<CashDeposit>>(`${environment.apiUrl}/v1/cash-deposit/all/${branchCode}`,{ params: pageQuery });
  }

  getCreatedCashDeposit(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<CashDeposit>> {
    return this.httpClient.get<ApiResponseQuery<CashDeposit>>(`${environment.apiUrl}/v1/cash-deposit/created/${branchCode}`,{ params: pageQuery });
  }

  getApprovedCashDeposit(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<CashDeposit>> {
    return this.httpClient.get<ApiResponseQuery<CashDeposit>>(`${environment.apiUrl}/v1/cash-deposit/approved/${branchCode}`,{ params: pageQuery });
  }

  getRejectedCashDeposit(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<CashDeposit>> {
    return this.httpClient.get<ApiResponseQuery<CashDeposit>>(`${environment.apiUrl}/v1/cash-deposit/rejected/${branchCode}`,{ params: pageQuery });
  }

  getDetail(code : string): Observable<CashDeposit> {
    return this.httpClient.get<CashDeposit>(`${environment.apiUrl}/v1/cash-deposit/${code}`);
  }

  reject(code : string , data: CashDeposit): Observable<CashDeposit> {
    return this.httpClient.post<CashDeposit>(`${environment.apiUrl}/v1/cash-deposit/${code}/reject`, data);
  }

  approve(code : string , data: CashDeposit): Observable<CashDeposit> {
    return this.httpClient.post<CashDeposit>(`${environment.apiUrl}/v1/cash-deposit/${code}/approve`, data);
  }
}
