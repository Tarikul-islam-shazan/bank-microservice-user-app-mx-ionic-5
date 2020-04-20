import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { HeaderService } from '@app/core/services/header-service.service';
import { Observable } from 'rxjs';
import { IInterestRate } from '@app/dashboard/models';

@Injectable()
export class InterestRateService {
  interestRateUrl = environment.serviceUrl + '/bank/accounts';
  constructor(private http: HttpClient, private headerService: HeaderService) {}

  /**
   * @method getInterestRate return interest rate of a account
   *
   * @param {string} accountId
   * @returns {Observable<IInterestRate>}
   * @memberof InterestRateService
   */
  getInterestRate(accountId: string): Observable<IInterestRate> {
    return this.http.get<IInterestRate>(`${this.interestRateUrl}/${accountId}/interest-rate`, {
      headers: this.headerService.getUserNameHeader()
    });
  }
}
