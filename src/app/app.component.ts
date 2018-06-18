import { Component } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(private socket: SocketService) {
    this.socket.subAdd( ['0~Poloniex~BTC~USD'] );
    this.socket.subsribe((data) => {
      alert(data);
    } );
}

}
