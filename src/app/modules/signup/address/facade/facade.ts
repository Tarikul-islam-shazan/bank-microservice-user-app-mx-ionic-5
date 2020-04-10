import { Injectable } from '@angular/core';
import { SignUpService, IStates, IScannedIdData, JumioApiService, IMemberApplication } from '@app/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import * as moment from 'moment';
@Injectable()
export class SignupAddressFacade {
  /**
   * maxDate use for restrict user to select less then 18
   *
   * @type {string}
   * @memberof SignupAddressFacade
   */
  public maxDate: string;
  constructor(
    private signUpService: SignUpService,
    private jumioService: JumioApiService,
    private router: Router,
    private analytics: AnalyticsService
  ) {
    this.maxDate = moment()
      .subtract(18, 'year')
      .format('YYYY-MM-DD');
  }

  getCountryState(): Observable<IStates[]> {
    const countryId: string = this.signUpService.member
      ? this.signUpService.member.country
      : '5ab159487fabb066abb60025';
    return this.signUpService.getCountryState(countryId);
  }
  getJumioScanData(): IScannedIdData {
    return this.jumioService.scannedIdData;
  }

  goToNext(memberApp: IMemberApplication) {
    Object.assign(this.signUpService.memberApplication, memberApp);
    this.analytics.logEvent(AnalyticsEventTypes.AddressInfoSubmitted);
    this.router.navigate(['/signup/confirm-identity']);
  }
}
