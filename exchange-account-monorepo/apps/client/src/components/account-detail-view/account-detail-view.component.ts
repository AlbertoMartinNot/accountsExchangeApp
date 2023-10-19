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
  imports: [CommonModule, MatTableModule, MatCardModule],
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
      cell: (element: Transaction) => element.debitBtc ? `BTC ${element.debitBtc}` + ` / $ ${element.debitUsd}` : '',
    },
    {
      columnDef: 'creditBtc',
      header: 'Credit',
      cell: (element: Transaction) => element.creditBtc ? `BTC ${element.creditBtc}` + ` / $ ${element.creditUsd}` : '',
    },
    {
      columnDef: 'balanceBtc',
      header: 'Balance',
      cell: (element: Transaction) => `BTC ${element.balanceBtc}` + ` / $ ${element.balanceUsd}`,
    },
  ];
  dataSource = ELEMENT_DATA;
  displayedColumns = this.columns.map(c => c.columnDef);

  detailData: any = {}
  updatedDetailData: any = {}

  updatedBalance = 0;

  constructor(private exchangeService: ExchangeService) { }

  ngOnInit() {
    this.detailData = history.state;
    this.exchangeService.getLastExchangeValue().subscribe((value) => {
      this.updatedDetailData = {};
      this.detailData.hasHigherValue = false;
      this.detailData.hasLowerValue = false;
      this.transformTransactionsData(value);
    })
    this.exchangeService.getLastBalanceValue().subscribe((value) => {
      this.updatedDetailData = {};
      this.detailData.hasHigherValue = false;
      this.detailData.hasLowerValue = false;
      this.setNewBalanceValue(value);
    })
    this.dataSource = this.detailData.transactions;
  }
  goBackToList() {
    history.back();
  }

  transformTransactionsData(newExchangeRate: number) {
    this.detailData.usdBalance = (this.detailData.btcBalance * newExchangeRate).toFixed(2);
    this.detailData.avaliableUsdBalance = (this.detailData.avaliableBtcBalance * newExchangeRate).toFixed(2);
    this.detailData.transactions.forEach((item: any) => {
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
    this.updatedDetailData = {...this.detailData};
  }
  setNewBalanceValue(newBalanceValue:number){
      const randomBalanceValue = (Math.floor(Math.random() * (newBalanceValue - 0.4 + 1)) + 0.4);
      this.setHigherOrLowerClassRow(randomBalanceValue)
      this.detailData.btcBalance = (this.detailData.btcBalance * randomBalanceValue).toFixed(5);
      this.detailData.avaliableBtcBalance = (this.detailData.avaliableBtcBalance * randomBalanceValue).toFixed(5);
      this.updatedDetailData = this.detailData;
  }

  setHigherOrLowerClassRow(newExchangeValue:number){
    if((this.detailData.btcBalance * newExchangeValue) > this.detailData.btcBalance){
      this.detailData.hasHigherValue = true;
      this.detailData.hasLowerValue = false;
    }else if((this.detailData.btcBalance * newExchangeValue) < this.detailData.btcBalance){
      this.detailData.hasHigherValue = false;
      this.detailData.hasLowerValue = true;
    }else{
      this.detailData.hasHigherValue = false;
      this.detailData.hasLowerValue = false;
    }
  }
}
