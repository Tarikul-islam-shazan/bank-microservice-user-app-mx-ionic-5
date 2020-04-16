import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JumioApiService, SignUpService } from '@app/core';
import { AnalyticsService } from '@app/analytics';
import * as moment from 'moment';
@Injectable()
export class BeneficiaryFacade {
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
}
