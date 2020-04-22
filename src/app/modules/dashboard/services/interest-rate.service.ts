import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { HeaderService } from '@app/core/services/header-service.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class InterestRateService {
  interestRateUrl = environment.serviceUrl + '/bank/accounts';
  constructor(private http: HttpClient, private headerService: HeaderService) {}

  /**
   * @method getInterestRate return interest rate of a account
   *
   * @param {string} accountId
   * @returns {Observable<number>}
   * @memberof InterestRateService
   */
  getInterestRate(accountId: string): Observable<number> {
    return this.http
      .get<{ amount: number }>(`${this.interestRateUrl}/${accountId}/interest-rate`, {
        headers: this.headerService.getUserNameHeader()
      })
      .pipe(map(res => res.amount));
  }
}
