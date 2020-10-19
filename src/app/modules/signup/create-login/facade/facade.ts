import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SignUpService } from '@app/core';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';

/**
 * * Issue: MM2-217
 * * Issue Details: Create Login Password hashing removed.
 * * Developer Feedback: Issue Fixed
 * Date: April 22, 2020
 * Developer: Zahidul Islam <zahidul@bs-23.net>
 */
@Injectable()
export class SignupCreateLoginFacade {
  constructor(
    private signupService: SignUpService,
    private router: Router,
    private readonly analyticsService: AnalyticsService
  ) {}

  createLogin(formValue: { username$: string; password$: string }) {
    this.signupService.createLogin(formValue).subscribe(() => {
      this.analyticsService.logEvent(AnalyticsEventTypes.LoginCreated, { username: formValue.username$ });
      this.router.navigate(['/signup/scanid']);
    });
  }
}
