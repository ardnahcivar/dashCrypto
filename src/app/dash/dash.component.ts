import { Component, OnInit } from '@angular/core';
import { CryptoDataService } from './../crypto-data.service'
import { DescComponent } from './../desc/desc.component'

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  private dcList: any = [];
  private selectedDc: any = null;
  constructor(private crypto: CryptoDataService) { }

  ngOnInit() {
    this.crypto.getData()
      .subscribe((cryptList: any) => {
        console.log(cryptList);
        this.dcList = cryptList.data});
  }

  selected(dc) {
    this.selectedDc = dc.id;
  }

}
