import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExchangeService } from '../services/exchange.service';
import {SocketIoModule} from 'ngx-socket-io'

@Component({
  standalone: true,
  imports: [RouterModule,SocketIoModule],
  selector: 'exchange-account-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private exchangeService:ExchangeService){}

  ngOnInit(){
    setInterval(this.exchangeService.sendMessage, 25000);
    this.exchangeService.receiveMessage();
  }
}
