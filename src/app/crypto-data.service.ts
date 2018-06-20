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

  constructor(private http: HttpClient) {}

  getHttp(url) {
      return this.http.get(url);
  }

  postHttp() {

  }
}
