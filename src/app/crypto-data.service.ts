import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CryptoDataService {
  private url: string = "https://min-api.cryptocompare.com/data/all/coinlist";
  private cryptoList = [];
  constructor(private http: HttpClient) {
   }

  getCryptoList() {
      return this.http.get(this.url);
  }
}
