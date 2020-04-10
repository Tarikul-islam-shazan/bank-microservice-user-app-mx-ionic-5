import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SignUpService, Logger } from '@app/core';
import jsSHA from 'jssha';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';

const log = new Logger('SignupEmailFacade');
@Injectable()
export class SignupCreateLoginFacade {
  constructor(private signupService: SignUpService, private router: Router, private analytics: AnalyticsService) {}

  createLogin(formValue: { username$: string; password$: string }) {
    formValue.password$ = this.generateHashPassword(formValue.password$);
    this.signupService.createLogin(formValue).subscribe(
      member => {
        this.analytics.logEvent(AnalyticsEventTypes.LoginCreated, { username: formValue.username$ });
        this.router.navigate(['/signup/scanid']);
      },
      err => {}
    );
  }
  generateHashPassword(password: string): string {
    const shaObj = new jsSHA('SHA-256', 'TEXT');
    shaObj.update(password);
    return shaObj.getHash('HEX');
  }
}
