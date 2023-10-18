import { Injectable } from '@nestjs/common';

const ACCOUNTS_DATA = [
  {name: 'Test Account 1', category: 'Test', btcBalance: 1.344, usdBalance: 0,avaliableBtcBalance:0.55324,avaliableUsdBalance:0},
  {name: 'Test Account 2', category: 'New', btcBalance: 3.45, usdBalance: 0,avaliableBtcBalance:2.55324,avaliableUsdBalance:0},
  {name: 'Test Account 3', category: 'New', btcBalance: 1.02, usdBalance: 0,avaliableBtcBalance:0.899,avaliableUsdBalance:0},
  {name: 'Test Account 4', category: 'Premium', btcBalance: 1.00002345, usdBalance: 0,avaliableBtcBalance:0.55324,avaliableUsdBalance:0},
  {name: 'Test Account 5', category: 'Test', btcBalance: 1.34, usdBalance: 0,avaliableBtcBalance:1.25324,avaliableUsdBalance:0},
  {name: 'Test Account 6', category: 'Old', btcBalance: 4.456, usdBalance: 0,avaliableBtcBalance:3.55324,avaliableUsdBalance:0},
  {name: 'Test Account 7', category: 'Premium', btcBalance: 3.664123, usdBalance: 0,avaliableBtcBalance:2.4554,avaliableUsdBalance:0},
  {name: 'Test Account 8', category: 'New', btcBalance: 2.6666, usdBalance: 0,avaliableBtcBalance:1.223,avaliableUsdBalance:0},
  {name: 'Test Account 9', category: 'New', btcBalance: 1.5666, usdBalance: 0,avaliableBtcBalance:0.95324,avaliableUsdBalance:0},
  {name: 'Test Account 10', category: 'Old', btcBalance: 1.234234, usdBalance: 0,avaliableBtcBalance:0.78,avaliableUsdBalance:0},
  {name: 'Test Account 11', category: 'Basic', btcBalance: 1.23422, usdBalance: 0,avaliableBtcBalance:0.65,avaliableUsdBalance:0},
  {name: 'Test Account 12', category: 'Basic', btcBalance: 1.00002345, usdBalance: 0,avaliableBtcBalance:0.23,avaliableUsdBalance:0},
  {name: 'Test Account 13', category: 'Test', btcBalance: 1.6666, usdBalance: 0,avaliableBtcBalance:0.1,avaliableUsdBalance:0},
  {name: 'Test Account 14', category: 'Test', btcBalance: 3.00002345, usdBalance: 0,avaliableBtcBalance:2.8,avaliableUsdBalance:0},
  {name: 'Test Account 15', category: 'test', btcBalance: 2.2342, usdBalance: 0,avaliableBtcBalance:2.09,avaliableUsdBalance:0}
]

@Injectable()
export class AccountsService {
  getAccounts() {
    return ACCOUNTS_DATA;
  }
}
