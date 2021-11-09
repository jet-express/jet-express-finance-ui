import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  // ApiResponse,
  ApiResponseQuery,
  PageQuery,
} from '../models';


@Injectable({
  providedIn: 'root'
})
export class VendorService {
  constructor(
    private httpClient: HttpClient
  ) { }

  public getVendor(keyword: string): Promise<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/v1/vendors?keyword=${keyword}`)
      .toPromise();
  }
}
