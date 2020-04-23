import { Injectable } from '@angular/core';
import { IScannedIdData, IMemberApplication, JumioApiService, SignUpService } from '@app/core';
import { Router } from '@angular/router';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import * as moment from 'moment';
@Injectable()
export class SignUpPersonalFacade {
  public maxDate: string;
  constructor(
    private router: Router,
    private jumioService: JumioApiService,
    private signUpService: SignUpService,
    private analytics: AnalyticsService
  ) {
    this.maxDate = moment()
      .subtract(18, 'year')
      .format('YYYY-MM-DD');
  }

  getJumioScanData(): IScannedIdData {
    return this.jumioService.scannedIdData;
  }

  goToNext(memberApp: IMemberApplication) {
    Object.assign(this.signUpService.memberApplication, memberApp);
    // this.analytics.logEvent(AnalyticsEventTypes.GeneralInfoSubmitted);
    this.router.navigate(['/signup/address']);
  }
}
