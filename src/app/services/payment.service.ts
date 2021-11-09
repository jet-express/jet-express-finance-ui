import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  // ApiResponse,
  ApiResponseQuery,
  PageQuery,
} from '../models';
import { VMPaymentInvoice } from '../models/vm-payment-invoice';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(
    private httpClient: HttpClient
  ) { }  

  create(branchCode : string, data: VMPaymentInvoice): Observable<VMPaymentInvoice> {
    return this.httpClient.post<VMPaymentInvoice>(`${environment.apiUrl}/v1/invoice/${branchCode}/pay`,data);
  }

  
  getHistory(branchCode : string ,startDate : any , endDate : any, pageQuery: any): Observable<ApiResponseQuery<VMPaymentInvoice>> {
    return this.httpClient.get<ApiResponseQuery<VMPaymentInvoice>>(`${environment.apiUrl}/v1/invoice/payment/history/${branchCode}?startDate=${startDate}&endDate=${endDate}`,{ params: pageQuery });
  }
}
