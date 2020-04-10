import { Store } from './store';
import { Injectable } from '@angular/core';
import { IAccount } from '../models/dto/account';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AccountStore extends Store<AccountState> {
  protected constructor() {
    super(new AccountState());
  }

  setAccountSummary(accounts: IAccount[]): void {
    this.setState({
      ...this.state,
      accounts
    });
  }

  getAccountSummary$(): Observable<AccountState> {
    return this.state$;
  }
}

export class AccountState {
  accounts: IAccount[] = [];
}
