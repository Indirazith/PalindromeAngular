import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PalindromeServiceService {


  baseUrl: string = "http://localhost:8080/MainController/";

  constructor(private http: HttpClient) { }

  //used to get data from the db
  getData(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `getData`);
  }

  //used to insert the data into the db
  insert(value: any): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `insert`, value);
  }

  //logic to check the palindrome
  checkForPalindrome(value: string): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `chcekForPalindrome`, value);
  }

  //setLimit to set the default limit in fetching data on reload
  setLimit(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `setDefaultLimit`);
  }




}
