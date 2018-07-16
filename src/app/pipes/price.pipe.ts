import { Pipe, PipeTransform } from '@angular/core';
import { CryptoDataService } from './../crypto-data.service';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  constructor(private crypto: CryptoDataService) {
  }

  transform(value: any, args?: any): any {
    let temp = value;
    this.crypto.getPrice(value.Name, 'USD').subscribe(val => {
      console.log(val);
      document.querySelector(`#${value.Name}`).textContent = val['USD'];
      return val['USD'];
    });
    // return "SBF";
  }

}
