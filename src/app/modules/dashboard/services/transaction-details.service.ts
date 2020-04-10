import { Injectable } from '@angular/core';
import { ITransaction, IAccount } from '@app/core/models/dto/account';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TransactionDetailsService {
  private _transaction: ITransaction;
  private _account: IAccount;

  constructor() {}

  setTransaction(transaction: ITransaction) {
    this._transaction = transaction;
  }

  setAccount(account: IAccount) {
    this._account = account;
  }

  getAccount(): IAccount {
    return this._account;
  }

  getTransaction(): ITransaction {
    return this._transaction;
  }
}

class TransactionDetailsState {
  private transaction = new BehaviorSubject<Partial<ITransaction>>({});
  private _transaction$ = this.transaction.asObservable();

  private account = new BehaviorSubject<Partial<IAccount>>({});
  private _account$ = this.account.asObservable();

  get transaction$(): Observable<Partial<ITransaction>> {
    return this._transaction$;
  }

  get account$(): Observable<Partial<IAccount>> {
    return this._account$;
  }

  setTransaction(transaction: ITransaction) {
    this.transaction.next(transaction);
  }

  setAccount(account: IAccount) {
    this.account.next(account);
  }
}
