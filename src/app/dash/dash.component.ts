import { Component, OnInit } from '@angular/core';
import { CryptoDataService } from './../crypto-data.service'
import { DescComponent } from './../desc/desc.component'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private crypto: CryptoDataService, private fb: FormBuilder) {
    this.crypto.getHttp('https://min-api.cryptocompare.com/data/all/exchanges').subscribe((exList: any) => {
      this.exchanges = Object.keys(exList);
      this.exchangeObj = exList;
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

    //     this.socket.emit('SubAdd', { subs: ['5~CCCAGG~NVC~USD', '5~CCCAGG~NEO~INR', '5~CCCAGG~ETH~INR', '5~CCCAGG~MNC~INR'] } );
    //     // this.socket.emit('subAdd', { subs: ['5~CCCAGG~BTC~INR'] });
    //     this.socket.on('m', (data) => {
    //       console.log(data);
    //       // this.socket.emit('SubAdd', { subs: ['5~CCCAGG~BTC~INR'] } );
    //       } );
    //     });

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
    console.log(this.Cryptoform.controls['toCurr'].value);
  }
}
