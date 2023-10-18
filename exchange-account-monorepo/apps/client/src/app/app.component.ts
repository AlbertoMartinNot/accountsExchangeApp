import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExchangeService } from '../services/exchange.service';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io'

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
    this.exchangeService.sendMessage();
    this.exchangeService.receiveMessage();
  }
}
