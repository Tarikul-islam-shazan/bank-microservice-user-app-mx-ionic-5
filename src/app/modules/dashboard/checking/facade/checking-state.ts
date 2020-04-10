import { Injectable } from '@angular/core';
import { ITransaction, IAccount } from '@app/core/models/dto/account';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable()
export class CheckingState {
  private pendingTransactions = new BehaviorSubject<ITransaction[]>([]);
  private _pendingTransactions$ = this.pendingTransactions.asObservable();

  private postedTransactions = new BehaviorSubject<ITransaction[]>([]);
  private _postedTransactions$ = this.postedTransactions.asObservable();

  private checkingAccount = new BehaviorSubject<Partial<IAccount>>({});
  private _checkingAccount$ = this.checkingAccount.asObservable();

  private showHide = new BehaviorSubject<boolean>(false);
  private _showHide$ = this.showHide.asObservable();

  constructor() {}

  get postedTransactions$(): Observable<ITransaction[]> {
    return this._postedTransactions$;
  }

  setPendingTransactionsState(transaction: ITransaction[]) {
    this.pendingTransactions.next(transaction);
  }

  get pendingTransactions$(): Observable<ITransaction[]> {
    return this._pendingTransactions$;
  }

  setPostedTransactionsState(transaction: ITransaction[]) {
    this.postedTransactions.next(transaction);
  }

  get checkingAccount$(): Observable<Partial<IAccount>> {
    return this._checkingAccount$;
  }

  setCheckingAccountState(account: Partial<IAccount>) {
    this.checkingAccount.next(account);
  }

  get showHide$(): Observable<boolean> {
    return this._showHide$;
  }

  getShowHideValue(): boolean {
    return this.showHide.getValue();
  }

  setShowHideState(showHide: boolean) {
    this.showHide.next(showHide);
  }
}
