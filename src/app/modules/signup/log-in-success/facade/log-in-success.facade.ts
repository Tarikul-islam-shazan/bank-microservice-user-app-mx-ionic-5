import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { SignUpService } from '@app/core';
/**
 * *Details: Facade added and get member from SignUpService
 *
 * @export
 * @class LogInSuccessFacade
 */
@Injectable()
export class LogInSuccessFacade {
  constructor(private signUpService: SignUpService, private router: Router, private analytics: AnalyticsService) {}

  get userNickname(): string {
    return this.signUpService.member.nickname;
  }

  continue() {
    this.analytics.logEvent(AnalyticsEventTypes.ApplicationStarted);
    this.router.navigate(['/signup/create-login']);
  }
}
