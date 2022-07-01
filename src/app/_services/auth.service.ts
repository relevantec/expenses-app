import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { catchError, mergeMap, Observable, tap, throwError } from 'rxjs';


export interface AuthResponseData {
 application_identifier: string,
 ip_address: string,
 scopes: string[],
 user: string,
 customer: number
} 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  id!: string;
  code!: string;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(error)
    }
    return throwError(
      'Something wrong happened; please try again later.');
  }

  postCode(code: string, id: string): Observable<any> {
    // const url = new  URL('https://www.marketcircle.com/account/oauth/token');
    const body = new URLSearchParams();
   
    body.set('client_secret', encodeURIComponent("mLVRSUUxY8tSHrrQhYqK"));
    body.set('client_id', encodeURIComponent(id));
    body.set('code', encodeURIComponent(code));
    body.set('grant_type', encodeURIComponent("authorization_code"));

    console.log(body.toString());    

    let headers =  new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    let options = { headers };
    

    return this.http.post<any>('https://www.marketcircle.com/account/oauth/token',
      body, options);
  }

}