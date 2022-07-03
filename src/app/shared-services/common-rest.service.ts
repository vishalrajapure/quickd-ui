import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonRestService {

  constructor(private httpClient: HttpClient) { }

  public getMethod(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  public getMethodWithQueryParam(url: string, param: HttpParams): Observable<any> {
    return this.httpClient.get(url, { params: param });
  }

  public postMethod(url: any, requestBody: any): Observable<any> {
    return this.httpClient.post(url, requestBody).pipe();
  }

  public putMethod(url: any, requestBody: any): Observable<any> {
    return this.httpClient.put(url, requestBody).pipe();
  }

}
