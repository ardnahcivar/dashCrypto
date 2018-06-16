import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CryptoDataService {
  private cryptoList: any;
  private url: string = "https://min-api.cryptocompare.com/v2/listings";

  constructor(private http: HttpClient) { }

  getData() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
      })
    };
    // let headers = new Headers();
    // headers.append('Content-Type','application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get(this.url);
  }
}
