import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService, Logger, ApplicationProgress, ErrorService, SettingsService } from '@app/core';
import { UrbanAirshipService } from '@app/core/services/urban-airship.service';
import { ModalService } from '@app/shared';
import { NavController } from '@ionic/angular';
import { UserSettings } from '@app/core/models/app-settings';

/**
 * * Issue: GMA-4443
 * * Issue Details: For Partially signed up user the modal redirecting to login page not closing after user is taken to the login screen
 * * Developer Feedback: Previous comprops dismiss function deprecated. modal service close function solve this issue
 * Date: February 18, 2020
 * Developer: Zahidul Islam <zahidul@bs-23.net>
 */
@Injectable()
export class SignupEmailFacade {
  constructor(
    private signupService: SignUpService,
    private router: Router,
    private analytics: AnalyticsService,
    private urbanAirshipService: UrbanAirshipService,
    private settingsService: SettingsService,
    private modalService: ModalService,
    private navCtrl: NavController
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
        this.router.navigate([this.memberSignupProgressRoute(data.applicationProgress)]);
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
        this.redirectToLoginPage();
        return '/signup/email';
    }
  }

  redirectToLoginPage() {
    const componentProps = {
      contents: [
        {
          title: 'signup-credentials-created.header-title',
          details: ['signup-credentials-created.message']
        }
      ],
      actionButtons: [
        {
          text: 'signup-credentials-created.login-button',
          cssClass: 'white-button',
          handler: () => {
            const userSettings: UserSettings = this.settingsService.getSettings().userSettings;
            userSettings.disabledSignUp = true;
            this.settingsService.setUserSettings(userSettings);
            this.modalService.close(); // new modal service modal close function added
            this.router.navigate(['/login-user']); // route to login page
          }
        }
      ]
    };

    this.modalService.openInfoModalComponent({ componentProps });
  }
}
