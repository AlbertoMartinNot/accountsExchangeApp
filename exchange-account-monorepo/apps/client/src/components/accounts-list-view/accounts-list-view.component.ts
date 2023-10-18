import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ExchangeService } from '../../services/exchange.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AccountsService } from '../../services/accounts.service';


export interface Account {
  name: string;
  category: string;
  btcBalance: number;
  usdBalance: string;
  avaliableBtcBalance: number;
  avaliableUsdBalance: string;
}

@Component({
  selector: 'exchange-account-monorepo-accounts-list-view',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './accounts-list-view.component.html',
  styleUrls: ['./accounts-list-view.component.css'],
})
export class AccountsListViewComponent {
  columns = [
    {
      columnDef: 'name',
      header: 'Account Name',
      cell: (element: Account) => `${element.name}`,
    },
    {
      columnDef: 'category',
      header: 'Category',
      cell: (element: Account) => `${element.category}`,
    },
    {
      columnDef: 'balance',
      header: 'Balance',
      cell: (element: Account) => `BTC ${element.btcBalance}` + ` / $ ${element.usdBalance}`,
    },
    {
      columnDef: 'avaliableBalance',
      header: 'Avaliable Balance',
      cell: (element: Account) => `BTC ${element.avaliableBtcBalance}` + ` / $ ${element.avaliableUsdBalance}`,
    },
  ];
  dataSource: any = [];
  displayedColumns = this.columns.map(c => c.columnDef);

  constructor(private router: Router, private exchangeService: ExchangeService, private accountsService: AccountsService) {

  }

  ngOnInit() {
    this.accountsService.getAccounts().subscribe((data: any) => {
      this.dataSource = data;
      this.exchangeService.getLastExchangeValue().subscribe((value) => {
        this.transformRowValues(value, 0);
      })
      this.exchangeService.getLastBalanceValue().subscribe((value) => {
        this.transformRowValues(0, value);
      })
    });

  }

  rowClicked(rowData: any) {
    this.router.navigateByUrl('/detail', { state: rowData })
  }

  transformRowValues(newExchangeValue: number, newBalanceValue: number) {
    if (newExchangeValue === 0) {
      for (const row of this.dataSource) {
        row.btcBalance = (row.btcBalance * newBalanceValue).toFixed(5);
        row.avaliableBtcBalance = (row.avaliableBtcBalance * newBalanceValue).toFixed(5);
        row.usdBalance = (row.usdBalance * newBalanceValue).toFixed(2);
        row.avaliableUsdBalance = (row.avaliableUsdBalance * newBalanceValue).toFixed(2)
      }
    } else {
      for (const row of this.dataSource) {
        row.usdBalance = (row.btcBalance * newExchangeValue).toFixed(2);
        row.avaliableUsdBalance = (row.avaliableBtcBalance * newExchangeValue).toFixed(2)
      }
    }
  }
}

