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
        // 'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + encodeURIComponent('SLcHBNZSy7ZIIFA56AwR7GG23xvbdI')
        // Authorization: 'Basic ' + encodeURIComponent('SLcHBNZSy7ZIIFA56AwR7GG23xvbdI')
      })
    let options = { headers };
    

    return this.http.post<any>('https://www.marketcircle.com/account/oauth/token',
      body, options);
      //   tap(res => {
      //     console.log(body);
          
      //     this.tokenService.saveToken(res.access_token);
      //     this.tokenService.saveRefreshToken(res.refresh_token);
      //   }),
        // catchError(this.handleError)
      // );
  }

  // refreshToken(refreshData: any): Observable<any> {
  //   const body = new HttpParams()
  //     .set('client_secret', encodeURIComponent("mLVRSUUxY8tSHrrQhYqK"))
  //     .set('client_id', encodeURIComponent(this.id))
  //     .set('authorization_code', encodeURIComponent(this.code))
  //     .set('grant_type', encodeURIComponent("authorization_code"));

  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       Authorization: 'Bearer ' + encodeURIComponent('SLcHBNZSy7ZIIFA56AwR7GG23xvbdI')
  //     })
  //   }
  //   this.tokenService.removeToken();
  //   this.tokenService.removeRefreshToken();
  //   const bodyRefr = new URLSearchParams({
  //     'refresh_token': refreshData.refresh_token,
  //     'grant_type': 'refresh_token'
  //   })
  //   return this.http.post<any>('https://www.marketcircle.com/account/oauth/token',
  //   bodyRefr, httpOptions)
  //     .pipe(
  //       tap(res => {
  //         console.log(res);
  //         this.tokenService.saveToken(res.access_token);
  //         this.tokenService.saveRefreshToken(res.refresh_token);
  //       }),
  //       catchError(this.handleError)
  //     );
  // }
}