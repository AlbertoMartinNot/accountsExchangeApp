import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import io  from 'socket.io-client';

const socket = io('http://localhost:8080');

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  lastExchangeSubject = new BehaviorSubject<number>(Math.floor(Math.random() * (12000 - 6000 + 1)) + 6000);
  lastExchange$ = this.lastExchangeSubject.asObservable();

  receiveMessage = () => {
    socket.on('msgToClient', msg => {
      console.log('message from websocket', msg);
      this.lastExchangeSubject.next(msg);
    });
  }

  sendMessage = () => {
    socket.emit('msgToServer','test message');
  };

  getLastExchangeValue(){
    return this.lastExchange$;
  }
}

