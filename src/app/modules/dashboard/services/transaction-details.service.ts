import { Injectable } from '@angular/core';
import { ITransaction, IAccount } from '@app/core/models/dto/account';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TransactionDetailsService {
  private _transaction = new BehaviorSubject<ITransaction>(null);
  private _account: IAccount = null;

  async setTransaction(transaction: ITransaction): Promise<void> {
    this._transaction.next(transaction);
  }

  setAccount(account: IAccount) {
    this._account = account;
  }

  getAccount(): IAccount {
    return this._account;
  }

  getTransaction(): Observable<ITransaction> {
    return this._transaction;
  }

  unsetTransaction() {
    this._transaction.next(null);
  }
}
