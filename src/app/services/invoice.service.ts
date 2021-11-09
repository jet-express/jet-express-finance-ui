import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  // ApiResponse,
  ApiResponseQuery,
  PageQuery,
} from '../models';
import { Invoice } from '../models/invoice';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(
    private httpClient: HttpClient
  ) { }  

  create(data: Invoice): Observable<Invoice> {
    return this.httpClient.post<Invoice>(`${environment.apiUrl}/v1/invoice/create`,data);
  }

  update(code : string , data: Invoice): Observable<Invoice> {
    return this.httpClient.put<Invoice>(`${environment.apiUrl}/v1/invoice/${code}`, data);
  }

  reject(code : string , data: Invoice): Observable<Invoice> {
    return this.httpClient.post<Invoice>(`${environment.apiUrl}/v1/invoice/${code}/reject`, data);
  }

  approve(code : string , data: Invoice): Observable<Invoice> {
    return this.httpClient.post<Invoice>(`${environment.apiUrl}/v1/invoice/${code}/approve`, data);
  }

  void(code : string , data: Invoice): Observable<Invoice> {
    return this.httpClient.post<Invoice>(`${environment.apiUrl}/v1/invoice/${code}/void`, data);
  }
  
  get(code: string): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${environment.apiUrl}/v1/invoice/${code}`);
  }
  
  getUnpaid(vendor : string, branchCode : string): Observable<ApiResponseQuery<Invoice>> {
    return this.httpClient.get<ApiResponseQuery<Invoice>>(`${environment.apiUrl}/v1/invoice/${vendor}/unpaid/${branchCode}`);
  }
  
  getAll(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<Invoice>> {
    return this.httpClient.get<ApiResponseQuery<Invoice>>(`${environment.apiUrl}/v1/invoice/all/${branchCode}`,{ params: pageQuery });
  }
    
  getCreated(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<Invoice>> {
    return this.httpClient.get<ApiResponseQuery<Invoice>>(`${environment.apiUrl}/v1/invoice/created/${branchCode}`,{ params: pageQuery });
  } 
    
  getApproved(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<Invoice>> {
    return this.httpClient.get<ApiResponseQuery<Invoice>>(`${environment.apiUrl}/v1/invoice/approved/${branchCode}`,{ params: pageQuery });
  } 
    
  getCompleted(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<Invoice>> {
    return this.httpClient.get<ApiResponseQuery<Invoice>>(`${environment.apiUrl}/v1/invoice/completed/${branchCode}`,{ params: pageQuery });
  }
    
  getRejected(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<Invoice>> {
    return this.httpClient.get<ApiResponseQuery<Invoice>>(`${environment.apiUrl}/v1/invoice/rejected/${branchCode}`,{ params: pageQuery });
  }  
    
  getVoid(branchCode : string, pageQuery: any): Observable<ApiResponseQuery<Invoice>> {
    return this.httpClient.get<ApiResponseQuery<Invoice>>(`${environment.apiUrl}/v1/invoice/void/${branchCode}`,{ params: pageQuery });
  } 
}
