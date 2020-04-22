import { Injectable } from '@angular/core';
import { SignUpService, IGeneralInfo, JumioApiService, IScannedIdData } from '@app/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';

@Injectable()
export class GeneralInformationFacade {
  public maxDate: string;
  constructor(
    private signUpService: SignUpService,
    private router: Router,
    private jumioService: JumioApiService,
    private analytics: AnalyticsService
  ) {
    this.maxDate = moment()
      .subtract(18, 'year')
      .format('YYYY-MM-DD');
  }

  applyGeneralInformation(generalInformation: IGeneralInfo) {
    this.signUpService.applyGeneralInformation(generalInformation).subscribe(resp => {
      this.analytics.logEvent(AnalyticsEventTypes.GeneralInfoSubmitted);
      this.router.navigateByUrl('/signup/living-information');
    });
  }

  getJumioScannedIdData(): IScannedIdData {
    return this.jumioService.scannedIdData;
  }
}
