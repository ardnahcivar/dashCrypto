import { Component, OnInit } from '@angular/core';
import { CryptoDataService } from './../crypto-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private firstName: string;
  private lastName: string;

  constructor() { }

  ngOnInit() {
  }

  onLogin(name) {
    alert(this.firstName + this.lastName);
  }

}
