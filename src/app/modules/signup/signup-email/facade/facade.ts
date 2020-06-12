import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService, ApplicationProgress, SettingsService } from '@app/core';
import { UrbanAirshipService } from '@app/core/services/urban-airship.service';
import { UserSettings } from '@app/core/models/app-settings';

/*
 * Issue: MM2-366
 * Issue Details: Remove complete bank application message for users who completed signup
 * Developer Feedback: Issue solved
 * Date: June 12, 2020
 * Developer: Zahidul Islam <zahidul@bs-23.net>
 */
@Injectable()
export class SignupEmailFacade {
  constructor(
    private signupService: SignUpService,
    private router: Router,
    private analytics: AnalyticsService,
    private urbanAirshipService: UrbanAirshipService,
    private settingsService: SettingsService
  ) {}

  async registerEmail(email: string) {
    await this.urbanAirshipService.setUserNotificationsEnabled(true);
    this.signupService
      .registerEmail({ email })
      .pipe() // do any mappings here
      .subscribe(data => {
        this.signupService.member = data;
        this.analytics.setUserId(data._id);
        this.analytics.logEvent(AnalyticsEventTypes.EmailSubmitted, { email });
        const route = this.memberSignupProgressRoute(data.applicationProgress);
        this.router.navigate([route]);
      });
  }

  /**This function is used to navigate the app in different stages of application
   *  depending on the application progress status
   *
   * Issue:  Fix/GMA-4637
   * Details:  Signup: Getting unknown an error in Terms & Conditions screen
   * @param {ApplicationProgress} applicationProgressStatus
   * @returns {string}
   * @memberof SignupEmailFacade
   */
  memberSignupProgressRoute(applicationProgressStatus: ApplicationProgress): string {
    switch (applicationProgressStatus) {
      case ApplicationProgress.EmailRegistered:
      case ApplicationProgress.EmailVerified:
        return '/signup/compressed';
      case ApplicationProgress.InviterChosen:
      case ApplicationProgress.CountrySelected:
      case ApplicationProgress.BankIdentified:
        return '/signup/verification';
      default:
        this.updateUserSettings();
        return '/login-user';
    }
  }

  updateUserSettings() {
    const userSettings: UserSettings = this.settingsService.getSettings().userSettings;
    userSettings.disabledSignUp = true;
    this.settingsService.setUserSettings(userSettings);
  }
}
