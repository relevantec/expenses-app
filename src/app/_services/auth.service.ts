import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { catchError, mergeMap, Observable, tap, throwError } from 'rxjs';

export interface AuthResponseData {
  application_identifier: string;
  ip_address: string;
  scopes: string[];
  user: string;
  customer: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // headers: new HttpHeaders({
  //   'Authorization': 'Bearer' + localStorage.getItem('Bearer')
  // })

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(error);
    }
    return throwError('Something wrong happened; please try again later.');
  }

  getInfo() {
    return this.http.get<any>('https://expenses.ldisol.bg/v1/info');
  }

  saveToken(token: string) {
    localStorage.setItem('Bearer', token);
  }

  getUser() {

  }
  
}