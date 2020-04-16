import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JumioApiService, SignUpService } from '@app/core';
import { AnalyticsService } from '@app/analytics';
@Injectable()
export class BeneficiaryFacade {
  constructor(
    private router: Router,
    private jumioService: JumioApiService,
    private signUpService: SignUpService,
    private analytics: AnalyticsService
  ) {}
}
