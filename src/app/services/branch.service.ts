import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  // ApiResponse,
  ApiResponseQuery,
  PageQuery,
  Branch
} from '../models';


@Injectable({
  providedIn: 'root'
})
export class BranchService {
  constructor(
    private httpClient: HttpClient
  ) { }
  
  getAll(pageQuery: any): Observable<ApiResponseQuery<Branch>> {
    return this.httpClient.get<ApiResponseQuery<Branch>>(`${environment.apiUrl}/v2/branches`, { params: pageQuery });    
  }
}
