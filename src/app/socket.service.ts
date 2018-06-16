import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Console } from '@angular/core/src/console';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) {
    this.socket.emit('SubAdd', { subs: ['0~RUPAY~BTC~RUP'] } );
    this.socket.on('m', (data) => {
      console.log(data);
} );
  }

  subAdd(data) {
  }

  subsribe(callback) {
  }

}
