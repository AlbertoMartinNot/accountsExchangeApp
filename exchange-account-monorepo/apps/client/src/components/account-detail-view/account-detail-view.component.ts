import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ExchangeService } from '../../services/exchange.service';

export interface Transaction {
  confirmedDate: string;
  orderId: number;
  orderCode: number;
  transactionType: string;
  debitBtc: number;
  debitUsd: number;
  creditBtc: number;
  creditUsd: number;
  balanceBtc: number;
  balanceUsd: number;
}

const ELEMENT_DATA: Transaction[] = [];

@Component({
  selector: 'exchange-account-monorepo-account-detail-view',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatCardModule],
  templateUrl: './account-detail-view.component.html',
  styleUrls: ['./account-detail-view.component.css'],
})
export class AccountDetailViewComponent implements OnInit {
  columns = [
    {
      columnDef: 'confirmedDate',
      header: 'Confirmed Date',
      cell: (element: Transaction) => `${element.confirmedDate}`,
    },
    {
      columnDef: 'orderId',
      header: 'Order ID',
      cell: (element: Transaction) => `${element.orderId}`,
    },
    {
      columnDef: 'orderCode',
      header: 'Order Code',
      cell: (element: Transaction) => `${element.orderCode}`,
    },
    {
      columnDef: 'transactionType',
      header: 'Transaction Type',
      cell: (element: Transaction) => `${element.transactionType}`,
    },
    {
      columnDef: 'debitBtc',
      header: 'Debit',
      cell: (element: Transaction) => element.debitBtc ? `BTC ${element.debitBtc}` + `/ $ ${element.debitUsd}`: '',
    },
    {
      columnDef: 'creditBtc',
      header: 'Credit',
      cell: (element: Transaction) => element.creditBtc ? `BTC ${element.creditBtc}` + `/ $ ${element.creditUsd}`: '',
    },
    {
      columnDef: 'balanceBtc',
      header: 'Balance',
      cell: (element: Transaction) => `BTC ${element.balanceBtc}` + `/ $ ${element.balanceUsd}`,
    },
  ];
  dataSource = ELEMENT_DATA;
  displayedColumns = this.columns.map(c => c.columnDef);

  rowData:any = {}

  updatedBalance = 0;

  constructor(private exchangeService:ExchangeService){}

  ngOnInit() {
    this.rowData=history.state;
    this.exchangeService.getLastExchangeValue().subscribe((value) => {
      this.transformTransactionsData(value);
    })
    /* this.exchangeService.getLastBalanceValue().subscribe((value) => {
      this.transformRowValues(0, value);
    }) */
    this.dataSource = this.rowData.transactions;
  }
  goBackToList(){
    history.back();
  }

  transformTransactionsData(newExchangeRate:number){
    this.rowData.usdBalance = (this.rowData.btcBalance * newExchangeRate).toFixed(2);
    this.rowData.avaliableUsdBalance = (this.rowData.avaliableBtcBalance * newExchangeRate).toFixed(2);
    this.rowData.transactions.forEach((item:any) => {
      if (item.debitBtc) {
          item.debitUsd = (item.debitBtc * newExchangeRate).toFixed(2);
      }
      if (item.creditBtc) {
        item.creditUsd = (item.creditBtc * newExchangeRate).toFixed(2);
    }
    if (item.balanceBtc) {
      item.balanceUsd = (item.balanceBtc * newExchangeRate).toFixed(2);
  }
  });
  }

}
