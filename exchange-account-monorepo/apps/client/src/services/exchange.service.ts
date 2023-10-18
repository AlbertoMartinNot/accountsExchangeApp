import { EventEmitter, Injectable, Output } from '@angular/core';
import io  from 'socket.io-client';

const socket = io('http://localhost:8080');

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  receiveMessage = () => {
    socket.on('msgToClient', msg => {
      console.log('message from websocket', msg);
    });
  }

  sendMessage = () => {
    socket.emit('msgToServer','test message');
  };
}

