import { Pipe, PipeTransform } from '@angular/core';
import { CryptoDataService } from './../crypto-data.service';
import { CurrencyPipe } from '@angular/common'

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  constructor(public currencyPipe: CurrencyPipe) {
  }

  transform(value: any, args?: any): any {
    let temp = value;
    return this.currencyPipe.transform(value, 'USD', false);
  }

}
