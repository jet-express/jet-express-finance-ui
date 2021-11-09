import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  // ApiResponse,
  ApiResponseQuery,
  PageQuery,
} from '../models';
import { PurchaseOrder } from '../models/purchase-order';


@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  constructor(
    private httpClient: HttpClient
  ) { }  

  create(data: PurchaseOrder): Observable<PurchaseOrder> {
    return this.httpClient.post<PurchaseOrder>(`${environment.apiUrl}/v1/purchase-order/create`,data);
  }

  update(code : string , data: PurchaseOrder): Observable<PurchaseOrder> {
    return this.httpClient.put<PurchaseOrder>(`${environment.apiUrl}/v1/purchase-order/${code}`, data);
  }

  reject(code : string , data: PurchaseOrder): Observable<PurchaseOrder> {
    return this.httpClient.post<PurchaseOrder>(`${environment.apiUrl}/v1/purchase-order/${code}/reject`, data);
  }

  approve(code : string , data: PurchaseOrder): Observable<PurchaseOrder> {
    return this.httpClient.post<PurchaseOrder>(`${environment.apiUrl}/v1/purchase-order/${code}/approve`, data);
  }

  void(code : string , data: PurchaseOrder): Observable<PurchaseOrder> {
    return this.httpClient.post<PurchaseOrder>(`${environment.apiUrl}/v1/purchase-order/${code}/void`, data);
  }
  
  get(code: string): Observable<PurchaseOrder> {
    return this.httpClient.get<PurchaseOrder>(`${environment.apiUrl}/v1/purchase-order/${code}`);
  }
  
  getAll(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<PurchaseOrder>> {
    return this.httpClient.get<ApiResponseQuery<PurchaseOrder>>(`${environment.apiUrl}/v1/purchase-order/all/${branchCode}`,{ params: pageQuery });
  }
    
  getCreated(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<PurchaseOrder>> {
    return this.httpClient.get<ApiResponseQuery<PurchaseOrder>>(`${environment.apiUrl}/v1/purchase-order/${branchCode}/created`,{ params: pageQuery });
  }  
    
  getApproved(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<PurchaseOrder>> {
    return this.httpClient.get<ApiResponseQuery<PurchaseOrder>>(`${environment.apiUrl}/v1/purchase-order/${branchCode}/approved`,{ params: pageQuery });
  } 
    
  getInvoiced(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<PurchaseOrder>> {
    return this.httpClient.get<ApiResponseQuery<PurchaseOrder>>(`${environment.apiUrl}/v1/purchase-order/${branchCode}/invoiced`,{ params: pageQuery });
  }
    
  getRejected(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<PurchaseOrder>> {
    return this.httpClient.get<ApiResponseQuery<PurchaseOrder>>(`${environment.apiUrl}/v1/purchase-order/${branchCode}/rejected`,{ params: pageQuery });
  }  
    
  getVoid(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<PurchaseOrder>> {
    return this.httpClient.get<ApiResponseQuery<PurchaseOrder>>(`${environment.apiUrl}/v1/purchase-order/${branchCode}/void`,{ params: pageQuery });
  } 

  getPoByVendor(vendor : string, keyword: string): Observable<PurchaseOrder> {
    return this.httpClient.get<PurchaseOrder>(`${environment.apiUrl}/v1/purchase-order/vendor/${vendor}?keyword=${keyword}`);
  }
}
