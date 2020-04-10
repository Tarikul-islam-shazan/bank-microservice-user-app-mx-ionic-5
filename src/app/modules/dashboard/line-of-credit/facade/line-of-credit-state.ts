import { Injectable } from '@angular/core';
import { IAccount, ITransaction } from '@app/core/models/dto/account';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LineOfCreditState {
  private pendingTransactions = new BehaviorSubject<ITransaction[]>([]);
  private _pendingTransactions$ = this.pendingTransactions.asObservable();

  private postedTransactions = new BehaviorSubject<ITransaction[]>([]);
  private _postedTransactions$ = this.postedTransactions.asObservable();

  private lineOfCreditAccount = new BehaviorSubject<Partial<IAccount>>({});
  private _lineOfCreditAccount$ = this.lineOfCreditAccount.asObservable();

  private showHide = new BehaviorSubject<boolean>(false);
  private _showHide$ = this.showHide.asObservable();

  constructor() {}

  get postedTransactions$(): Observable<ITransaction[]> {
    return this._postedTransactions$;
  }

  setPostedTransactionsState(transaction: ITransaction[]) {
    this.postedTransactions.next(transaction);
  }

  get pendingTransactions$(): Observable<ITransaction[]> {
    return this._pendingTransactions$;
  }

  setPendingTransactionsState(transaction: ITransaction[]) {
    this.pendingTransactions.next(transaction);
  }

  get lineOfCreditAccount$(): Observable<Partial<IAccount>> {
    return this._lineOfCreditAccount$;
  }

  setLineOfCreditAccountState(account: Partial<IAccount>) {
    this.lineOfCreditAccount.next(account);
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
