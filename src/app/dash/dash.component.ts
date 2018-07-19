import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CryptoDataService } from './../crypto-data.service';
import { DescComponent } from './../desc/desc.component';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/internal/Observable';
import { PricePipe } from './../pipes/price.pipe';

let s = [];

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit, AfterViewInit {

  private selectedDc: any = null;
  private Cryptoform: FormGroup;
  private exchanges: any = [];
  private exchangeObj: any;
  private fromCurr = [];
  private toCurr = [];
  private coinList: Observable<any>[] = [];


  constructor(private crypto: CryptoDataService, private fb: FormBuilder, private socket: Socket, private elementRef: ElementRef, private pp: PricePipe) {
    this.crypto.getHttp('https://min-api.cryptocompare.com/data/all/exchanges').subscribe((exList: any) => {
      this.exchanges = Object.keys(exList);
      this.exchangeObj = exList;
    });

    this.crypto.getCoinList().subscribe((c) => {
      this.coinList = c;
      this.coinList.forEach((val: any, ind) => {
        console.log(val);
        console.log(ind);
        // s.push(`11~${val.Name}`);
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
      if (splitData[2].includes('*')) {
        console.log(splitData[2]);
        splitData[2] = splitData[2].replace(/[^a-zA-Z ]/g, '');
        splitData[2] = splitData[2] + '\\*';
      }
      if (splitData[1].includes('*')) {
        console.log(splitData[1]);
        splitData[1] = splitData[1].replace(/[^a-zA-Z ]/g, '');
        splitData[1] = splitData[1] + '\\*';
      }
      if (this.elementRef.nativeElement.querySelector(`#${splitData[1]}`) ||
       this.elementRef.nativeElement.querySelector(`#${splitData[2]}`)) {
        if (splitData[0] = '11' && splitData[4] !== '4' && splitData[1] !== 'CCCAGG') {
          this.elementRef.nativeElement.querySelector(`#${splitData[1]}`).textContent = pp.transform(splitData[2]);
        } else if (splitData[0] = '5' && splitData[4] !== '4' && splitData[2] !== 'CCCAGG') {
          this.elementRef.nativeElement.querySelector(`#${splitData[2]}`).textContent = pp.transform(splitData[5]);
        }
      }
    });

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
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
