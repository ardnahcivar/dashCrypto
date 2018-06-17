import { Component, OnInit } from '@angular/core';
import { CryptoDataService } from './../crypto-data.service';
import { DescComponent } from './../desc/desc.component';
import { Observable } from 'rxjs/Observable';
import { SocketService } from 'src/app/socket.service';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  private dcList = [];
  private selectedDc: any = null;
  constructor(private crypto: CryptoDataService, private socket: Socket) { }

  ngOnInit() {
    this.crypto.getCryptoList().subscribe((cryptList: any) => {
        this.dcList = Object.values(cryptList.Data);
        console.log(this.dcList);
        let subs = [];
        this.dcList.forEach((curr, index) => {
          if (index > 5 ) {
            return -1;
          } else {
            console.log(curr.Symbol);
            subs.push('5~CCCAGGG~' + curr.Symbol + 'INR');
          }
        });

        this.socket.emit('SubAdd', { subs: ['5~CCCAGG~NVC~USD', '5~CCCAGG~NEO~INR', '5~CCCAGG~ETH~INR', '5~CCCAGG~MNC~INR'] } );
        // this.socket.emit('subAdd', { subs: ['5~CCCAGG~BTC~INR'] });
        this.socket.on('m', (data) => {
          console.log(data);
          // this.socket.emit('SubAdd', { subs: ['5~CCCAGG~BTC~INR'] } );
          } );
        });
  }

  selected(dc) {
    this.selectedDc = dc.Id;
  }

}
