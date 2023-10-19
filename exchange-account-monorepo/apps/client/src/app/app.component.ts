import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { ExchangeService } from '../services/exchange.service';
import {SocketIoModule} from 'ngx-socket-io'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule,RouterModule,SocketIoModule,MatToolbarModule,MatCardModule, MatButtonModule],
  selector: 'exchange-account-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = '';
  subtitle = ''
  
  lastExchange = 0;

  showGoBackButton = false;

  constructor(private exchangeService:ExchangeService,private router: Router){}

  ngOnInit(){
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.checkUrlEndpoint(event.url)
      }
    });
    setInterval(this.exchangeService.triggerExchange, 20000);
    setInterval(this.exchangeService.triggerBalance, 32000);
    this.exchangeService.receiveExchange();
    this.exchangeService.receiveBalance();
    this.exchangeService.getLastExchangeValue().subscribe((data)=>{
      this.lastExchange = data;
    })
  }

  checkUrlEndpoint(url:string){
    if(url.includes("detail")){
      this.title = 'Detail';
      this.subtitle = 'Account Detail';
      this.showBackButton();
    }else{
      this.title = 'Accounts';
      this.subtitle = 'Accounts List';
      this.hideBackButton();
    }
  }

  showBackButton(){
    this.showGoBackButton = true;
  }

  hideBackButton(){
    this.showGoBackButton = false;
  }

  backToList(){
    history.back();
  }
}
