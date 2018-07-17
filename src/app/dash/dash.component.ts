import { Component, OnInit } from '@angular/core';
import { CryptoDataService } from './../crypto-data.service';
import { DescComponent } from './../desc/desc.component';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/internal/Observable';

let s = [];

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  private selectedDc: any = null;
  private Cryptoform: FormGroup;
  private exchanges: any = [];
  private exchangeObj: any;
  private fromCurr = [];
  private toCurr = [];
  private coinList: Observable<any>[] = [];

  constructor(private crypto: CryptoDataService, private fb: FormBuilder, private socket: Socket) {
    this.crypto.getHttp('https://min-api.cryptocompare.com/data/all/exchanges').subscribe((exList: any) => {
      this.exchanges = Object.keys(exList);
      this.exchangeObj = exList;
    });

    this.crypto.getCoinList().subscribe((c) => {
      this.coinList = c;
      this.coinList.forEach((val: any, ind) => {
        console.log(val);
        console.log(ind);
        s.push(`11~${val.Name}`);
        s.push(`5~CCCAGG~${val.Name}~USD`);
        if (ind == this.coinList.length - 1) {
          this.socket.emit('SubAdd', { subs: s });
        }
      })
    });

    this.Cryptoform = this.fb.group({
      exchanges: '',
      fromCurr: '',
      toCurr: ''
    });

    this.Cryptoform.valueChanges.subscribe((selected) => {
      if (selected.exchanges) {
        this.fromCurr = Object.keys(this.exchangeObj[selected.exchanges]);
        if (selected.fromCurr) {
          this.toCurr = this.exchangeObj[selected.exchanges][selected.fromCurr];
        }
        return;
      }
    });
    this.socket.on('m', (data) => {
      let splitData = data.split('~');
      console.log(splitData);
      if (document.querySelector(`#${splitData[1]}`) || document.querySelector(`#${splitData[2]}`)) {
        if (splitData[0] = "11") {
          document.querySelector(`#${splitData[1]}`).textContent = splitData[2];
        } else if (splitData[0] = "5" && splitData[4] != "4") {
          document.querySelector(`#${splitData[2]}`).textContent = splitData[5];
        }
      }
    });

  }

  ngOnInit() {
    // this.crypto.getHttp(this.url).subscribe((cryptList: any) => {
    //     this.dcList = Object.values(cryptList.Data);
    //     console.log(this.dcList);
    //     let subs: any = [];
    //     this.dcList.forEach((curr, index) => {
    //       if (index > 5 ) {
    //         return -1;
    //       } else {
    //         console.log(curr.Symbol);
    //         subs.push('5~CCCAGGG~' + curr.Symbol + 'INR');
    //       }
    //     });

    // this.socket.emit('SubAdd', { subs: ['5~CCCAGG~BTC~USD'] } );
    // this.socket.emit('subAdd', { subs: ['5~CCCAGG~BTC~INR'] });
    // this.socket.on('m', (data) => {
    //   console.log(data);
    //   // this.socket.emit('SubAdd', { subs: ['5~CCCAGG~BTC~INR'] } );
    //   } );
    // } )

    // this.selectionForm.valueChanges.subscribe((selectedVal) => {
    //   if ( selectedVal.exchange ) {
    //       this.exchangesList = Object.keys(this.exchangeObj[selectedVal.exchange]);
    //       if ( selectedVal.fromCurr  ) {
    //           this.fromCurr = this.exchangeObj[selectedVal.exchange][selectedVal.fromCurr];
    //       }
    //       return;
    //   }
    // });
  }
  selected(dc) {
    this.selectedDc = dc.id;
  }

  addToDashboard() {
    let exchange = this.Cryptoform.controls['exchanges'].value;
    let fromVal = this.Cryptoform.controls['fromCurr'].value;
    let toVal = this.Cryptoform.controls['toCurr'].value;
    // let dict = ['subs' : ["5~CCCAGG~BTC~USD"]];
    s.push('5~' + exchange + '~' + fromVal + '~' + toVal);
    this.socket.emit('SubAdd', { subs: s });
  }
}
