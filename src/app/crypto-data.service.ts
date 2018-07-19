import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CryptoDataService {

  private coinListUrl = 'https://min-api.cryptocompare.com/data/all/coinlist';
  private coinSnap = 'https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/';

  private coinsList = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {
    let temp: any = [];
    this.http.get(this.coinListUrl).subscribe((coins: any) => {
      const breakpoint = 1;
      const nos = 1000;
      let started: boolean = false;
      for (let p in coins.Data) {
        if (started) {
          temp.push(coins['Data'][p]);
        }
        if (coins['Data'][p].SortOrder == breakpoint.toString()) {
          temp.push(coins['Data'][p]);
          started = true;
        }
        if (temp.length === nos) {
          break;
        }
      }
      this.coinsList.next(temp);
    });
  }

  getHttp(url) {
    return this.http.get(url);
  }

  postHttp() {

  }

  getCoinList() {
    return this.coinsList;
  }

  getPrice(name, currency) {
    return this.http.get(`https://min-api.cryptocompare.com/data/price?fsym=${name}&tsyms=${currency}`);
  }

  getCoinSnap(id: Number) {
    return this.http.get(`${this.coinSnap}id=${id}`);
  }
}
