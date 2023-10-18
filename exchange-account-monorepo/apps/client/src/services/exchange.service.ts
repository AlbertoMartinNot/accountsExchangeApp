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
  lastBalanceSubject = new BehaviorSubject<number>(Math.floor(Math.random() * (1.6 - 0.5 + 1)) + 0.5);
  lastBalance$ = this.lastBalanceSubject.asObservable();

  receiveExchange = () => {
    socket.on('updateExchange', msg => {
      this.lastExchangeSubject.next(msg);
    });
  }

  receiveBalance = () => {
    socket.on('updateBalance', msg => {
      this.lastBalanceSubject.next(msg);
    });
  }

  triggerExchange = () => {
    socket.emit('triggerExchange','trigger');
  };

  triggerBalance = () => {
    socket.emit('triggerBalance','trigger');
  };

  getLastExchangeValue(){
    return this.lastExchange$;
  }

  getLastBalanceValue(){
    return this.lastBalance$;
  }
}

