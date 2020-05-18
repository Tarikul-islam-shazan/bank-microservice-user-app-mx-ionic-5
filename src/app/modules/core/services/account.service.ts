import { Injectable } from '@angular/core';
import { IAccount, ISweepState, ITransactionQueries, AccountType } from '../models/dto/account';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { AccountTransaction } from '@app/dashboard/models';
import { map, tap, shareReplay } from 'rxjs/operators';
import { HeaderService } from './header-service.service';
export interface IAccountSummary {
  accounts: IAccount[];
}
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountSummary: IAccount[];
  private reward: number;
  accountsUrl = environment.serviceUrl + '/bank/accounts/';
  sweepStatus$: Observable<ISweepState>;
  constructor(private http: HttpClient, private headerService: HeaderService) {}

  public setAccountSummary(accountSummary: IAccount[]) {
    this.accountSummary = accountSummary;
  }

  public setReward(reward: number) {
    this.reward = reward;
  }

  public getReward(): number {
    return this.reward;
  }

  public getCachedAccountSummary(): IAccount[] {
    return this.accountSummary;
  }

  public fetchAccountSummary(): Observable<IAccount[]> {
    return this.http
      .get<IAccount[]>(this.accountsUrl, {
        headers: this.headerService.getUserNameCustomerIdHeader()
      })
      .pipe(
        tap((accounts: IAccount[]) => {
          this.setAccountSummary(accounts);
        })
      );
  }

  /**
   * Added transactionQueries optional param to get the seached transactions
   * Date: March 06, 2020
   * Developer: M G Muntaqeem <muntaqeem@bs-23.net>
   */
  public getTransactions(
    accountId: string,
    transactionQueries: ITransactionQueries = null
  ): Observable<AccountTransaction> {
    return this.http.get<AccountTransaction>(`${this.accountsUrl}${accountId}/transactions`, {
      headers: this.headerService.getUserNameHeader(),
      params: { ...transactionQueries } as HttpParams
    });
  }

  /**
   *
   * @description load user account sweep status
   * @returns {Observable<ISweepState>}
   * @memberof AccountService
   */
  public fetchAccountSweepStatus(): Observable<ISweepState> {
    return this.http.get<ISweepState>(`${environment.serviceUrl}/accounts/sweeps`, {
      headers: this.headerService.getUserNameHeader()
    });
  }

  /**
   *
   * @description load user account cache sweep status
   * @returns {Observable<ISweepState>}
   * @memberof AccountService
   */
  getAccountSweepStatus(): Observable<ISweepState> {
    if (!this.sweepStatus$) {
      this.sweepStatus$ = this.fetchAccountSweepStatus().pipe(shareReplay(1));
    }
    return this.sweepStatus$;
  }

  /**
   *
   * @description update user account sweep status
   * @param {ISweepState} apiParms
   * @returns {Observable<ISweepState>}
   * @memberof AccountService
   */
  updateAccountSweepStatus(apiParms: ISweepState): Observable<ISweepState> {
    return this.http
      .patch<ISweepState>(`${environment.serviceUrl}/accounts/sweeps`, apiParms, {
        headers: this.headerService.getUserNameHeader()
      })
      .pipe(
        tap(data => {
          this.sweepStatus$ = new Observable(ob => ob.next(data));
        })
      );
  }
}
