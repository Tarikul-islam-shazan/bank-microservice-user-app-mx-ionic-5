import { LoginForm, LoginRequest } from '../models/login';
import { Injectable } from '@angular/core';
import { SignUpService, IAccount, CardService } from '@app/core';
import { Router } from '@angular/router';
import { LoginService } from '@app/core/services/login.service';
import { LogoutService } from '@app/core/services/logout.service';
import jsSHA from 'jssha';
import { AccountService } from '@app/core/services/account.service';
import { MemberService } from '@app/core/services/member.service';
import { IRegisteredMember, IMember, ApplicationProgress, ApplicationStatus } from '@app/core/models/dto/member';
import { SettingsService } from '@app/core/services/settings.service';
import { BiometricAuthenticationService } from '@app/core/services/biometric-authentication.service';
import { UrbanAirshipService } from '@app/core/services/urban-airship.service';
import { AnalyticsService, AnalyticsUserProperties, AnalyticsEventTypes } from '@app/analytics';
import { AppPlatform } from '@app/core/util/app-platform';
import { ModalService, IMeedModalComponentProps } from '@app/shared';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Injectable()
export class LoginFacade {
  constructor(
    private auth: LoginService,
    private logoutReason: LogoutService,
    private router: Router,
    private accountService: AccountService,
    private memberService: MemberService,
    private signUpService: SignUpService,
    private settingsService: SettingsService,
    private biometricAuthenticationService: BiometricAuthenticationService,
    private urbanAirshipService: UrbanAirshipService,
    private analyticsService: AnalyticsService,
    private appPlatform: AppPlatform,
    private modalService: ModalService,
    private callService: CallNumber,
    private cardService: CardService
  ) {}

  /**
   * @summary authenticates username password
   *
   * @param {LoginForm} creds
   * @param {boolean} [biometricLogin=false]
   * @returns {Promise<void>}
   * @memberOf LoginFacade
   */
  async authenticate(creds: LoginForm, biometricLogin: boolean = false): Promise<void> {
    if (!biometricLogin) {
      creds.password = await this.hashPassword(creds.password);
    }
    creds.username = creds.username.toLowerCase();
    this.auth.login(creds).subscribe((data: IRegisteredMember) => {
      this.analyticsService.logEvent(AnalyticsEventTypes.LoginOptionClicked, {
        faceId: creds.rememberBiometric,
        username: creds.rememberUsername
      });
      const { accountSummary, configurationData, meedRewardsEarned, ...member } = data;
      this.accountService.setAccountSummary(accountSummary);
      this.accountService.setReward(meedRewardsEarned);
      this.memberService.setMember(member);
      this.checkApplicationStatus(member, accountSummary);
    });
  }

  /**
   * @summary hashes password
   *
   * @param {string} password
   * @returns {string}
   * @memberOf LoginFacade
   */
  hashPassword(password: string): string {
    const shaObj = new jsSHA('SHA-256', 'TEXT');
    shaObj.update(password);
    return shaObj.getHash('HEX');
  }
  /**
   * Plaform wise text showing in checkbox
   * @memberof LoginFacade
   * Ticket: 4250
   * Details: Login Screen> For android device Touch ID should be shown instead of Face ID in Login Screen
   * Date: March 03, 2020
   * Developer: Utpaul <Utpal.Sarker@brainstation23.com>
   */
  get rememberFaceIdOrPasswordText(): string {
    return this.appPlatform.isAndroid()
      ? 'login-module.create-login-page.login-form.remember-touch-id'
      : 'login-module.create-login-page.login-form.remember-face-id-or-touch-id';
  }

  get isCordova(): boolean {
    return this.appPlatform.isCordova();
  }

  get supportNumber() {
    return this.cardService.supportNumber;
  }

  get username(): string {
    return this.settingsService.getSettings().userSettings.username;
  }

  get useBiometric(): boolean {
    return this.settingsService.getSettings().userSettings.useBiometric;
  }

  /**
   * @summary navigates to given route
   *
   * @param {string} routeToNavigate
   * @returns {void}
   * @memberOf LoginFacade
   */
  navigateToRoute(routeToNavigate: string): void {
    this.router.navigate([routeToNavigate]);
  }

  /**
   * Checks application status
   * @param member
   * @param accountSummary
   * Ticket: GMA-4685
   * @summary we should first check application status then application progress for dropout scenario
   * Date: March 10, 2020
   */
  checkApplicationStatus(member: IMember, accountSummary: IAccount[]) {
    switch (member.applicationStatus) {
      case ApplicationStatus.OnHold:
      case ApplicationStatus.Denied:
        this.openDenyModal(member.applicationStatus);
        break;
      case ApplicationStatus.Completed:
        this.analyticsService.logEvent(AnalyticsEventTypes.LoginCompleted);
        this.analyticsService.setUserId(member._id);
        this.analyticsService.setUserProperty(AnalyticsUserProperties.UserEmail, member.email);
        this.urbanAirshipService.setNamedUser(member.customerId);
        this.navigateToRoute('/dashboard');
        break;
      default:
        this.initSignupServiceProperties(member, accountSummary);
        this.changeRouteByApplicationProgress(member);
        break;
    }
  }

  /**
   * @summary initializes signup service properties
   *
   * @param {IMember} member
   * @param {IAccount[]} accountSummary
   * @returns {void}
   * @memberOf LoginFacade
   */
  initSignupServiceProperties(member: IMember, accountSummary: IAccount[]): void {
    this.signUpService.member = member;
    this.signUpService.signUpDirectDepositAccounts.accounts = accountSummary;
  }

  /**
   * This function opens the deny or on-hold status modal.
   *
   * @param {string} applicationStatus
   * @returns {void}
   * @memberof LoginFacade
   */
  openDenyModal(applicationStatus: ApplicationStatus): void {
    switch (applicationStatus) {
      case ApplicationStatus.OnHold:
        this.modalService.openInfoModalComponent(
          this.accountHoldAndDeniedModal(
            'login-module.create-login-page.status-on-hold.title',
            'login-module.create-login-page.status-on-hold.content'
          )
        );
        break;
      case ApplicationStatus.Denied:
        this.modalService.openInfoModalComponent(
          this.accountHoldAndDeniedModal(
            'login-module.create-login-page.status-denied.title',
            'login-module.create-login-page.status-denied.content'
          )
        );
        break;
    }
  }

  /**
   * Shows the modal with dynamic contents depending on the account status
   *
   * @param {string} title
   * @param {string} content
   * @returns {IMeedModalComponentProps}
   * @memberof LoginFacade
   */
  accountHoldAndDeniedModal(title: string, content: string): IMeedModalComponentProps {
    const modalComponentContent: IMeedModalComponentProps = {
      componentProps: {
        contents: [
          {
            title,
            details: [content]
          }
        ],
        actionButtons: [
          {
            text: 'login-module.create-login-page.modal-action-btn.modal-dismiss-button-text',
            cssClass: 'white-button',
            handler: () => this.modalService.close()
          }
        ]
      }
    };
    return modalComponentContent;
  }
  /**
   * This function is used to navigate the app in different initial states of application
   * depending on the application progress status
   *
   * Issue:  Fix/GMA-4637
   * Details:  Signup: Getting unknown an error in Terms & Conditions screen
   * @param {IMember} member
   * @returns {void}
   * @memberof LoginFacade
   */
  changeRouteByApplicationProgress(member: IMember): void {
    switch (member.applicationProgress) {
      case ApplicationProgress.TermsAndConditionAccepted:
        this.navigateToRoute('/signup/deposit/direct-deposit-start');
        break;
      case ApplicationProgress.IdentityQuestionsViewed:
        this.navigateToRoute('/signup/identity-verification');
        break;
      case ApplicationProgress.IdentityQuestionsAnswered:
        this.navigateToRoute('/signup/terms-conditions');
        break;
      case ApplicationProgress.BankApplicationSubmitted:
        this.navigateToRoute('/signup/terms-conditions');
        break;
      // ProductOnboarded case has been added to navigate the user in /signup/terms-conditions page
      case ApplicationProgress.ProductOnboarded:
        this.navigateToRoute('/signup/terms-conditions');
        break;
      case ApplicationProgress.CredentialsCreated:
        this.navigateToRoute('/signup/scanid');
        break;

      default:
        this.navigateToRoute('/login-user');
        break;
    }
  }

  /**
   * @summary authenticate biometric
   *
   * @param {LoginForm} credentials
   * @returns {Promise<void>}
   * @memberOf LoginFacade
   */
  async requestBiometricAuthentication(credentials: LoginForm): Promise<void> {
    const credentialsResponse: LoginRequest = await this.biometricAuthenticationService.authenticateBiometric();
    if (credentialsResponse) {
      credentials = { ...credentials, ...credentialsResponse };
      this.authenticate(credentials, true);
    }
  }

  /**
   * @method {biometricAvailable} return biomertic available or not.
   *
   * @readonly
   * @type {boolean}
   * @memberof LoginFacade
   */
  get biometricAvailable(): boolean {
    return this.biometricAuthenticationService.getBiometricIsAvailable();
  }

  /**
   * @summary check signup availability
   *
   * @returns {boolean}
   * @memberOf LoginFacade
   */
  checkSignUpFeatureAvailableForUser(): boolean {
    const isSignUpAvailable = this.settingsService.getSettings().userSettings.disabledSignUp;
    return !isSignUpAvailable ? false : true;
  }

  /**
   * Determines whether logged out and logout success modal Login button event
   * @returns logged out
   */
  async isLoggedOut(): Promise<boolean> {
    return await this.logoutReason.isLoggedOut();
  }

  /**
   * Fix GMA-4757
   * This function opens help modal.
   * @memberof LoginFacade
   */
  async openHelpModal(): Promise<void> {
    const modalComponentContent: IMeedModalComponentProps = {
      componentProps: {
        contents: [
          {
            details: ['login-module.create-login-page.help-modal-message']
          }
        ],
        actionButtons: [
          {
            text: 'login-module.create-login-page.help-modal-call-no',
            cssClass: 'white-button',
            handler: () => {
              if (this.appPlatform.isIos || this.appPlatform.isAndroid) {
                this.callService.callNumber(this.supportNumber, true);
              } else {
                window.open(this.supportNumber, '_system');
              }
            }
          },
          {
            text: 'login-module.create-login-page.help-modal-cancle-btn-text',
            cssClass: 'grey-outline-button',
            handler: () => this.modalService.close()
          }
        ]
      }
    };

    await this.modalService.openInfoModalComponent(modalComponentContent);
  }
}
