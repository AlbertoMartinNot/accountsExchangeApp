import { Injectable } from '@angular/core';

import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private url = 'http://localhost:3000/api/accounts';

  constructor(private http:HttpClient) { }

  getAccounts(){
    return this.http.get(this.url);
  }
}
