import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExchangeService } from '../services/exchange.service';
import {SocketIoModule} from 'ngx-socket-io'
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule,RouterModule,SocketIoModule,MatToolbarModule,MatCardModule],
  selector: 'exchange-account-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';
  
  lastExchange = 0;

  constructor(private exchangeService:ExchangeService){}

  ngOnInit(){
    setInterval(this.exchangeService.triggerExchange, 5000);
    setInterval(this.exchangeService.triggerBalance, 10000);
    this.exchangeService.receiveExchange();
    this.exchangeService.receiveBalance();
    this.exchangeService.getLastExchangeValue().subscribe((data)=>{
      this.lastExchange = data;
    })
  }
}
