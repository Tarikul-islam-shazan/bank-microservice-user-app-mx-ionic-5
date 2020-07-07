import { LoginForm, LoginRequest } from '../models/login';
import { Injectable } from '@angular/core';
import { SignUpService, IAccount } from '@app/core';
import { Router } from '@angular/router';
import { LoginService } from '@app/core/services/login.service';
import { LogoutService } from '@app/core/services/logout.service';
import { AccountService } from '@app/core/services/account.service';
import { MemberService } from '@app/core/services/member.service';
import { IRegisteredMember, IMember, ApplicationProgress, ApplicationStatus } from '@app/core/models/dto/member';
import { AccountLevel } from '@app/core/models/dto/account';
import { SettingsService } from '@app/core/services/settings.service';
import { BiometricAuthenticationService } from '@app/core/services/biometric-authentication.service';
import { UrbanAirshipService } from '@app/core/services/urban-airship.service';
import { AnalyticsService, AnalyticsUserProperties, AnalyticsEventTypes } from '@app/analytics';
import { AppPlatform } from '@app/core/util/app-platform';
import { ModalService, IMeedModalComponentProps } from '@app/shared';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { StaticDataService } from '@app/core/services/static-data.service';
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
    private staticDataService: StaticDataService
  ) {}

  /**
   * @summary authenticates username password
   *
   * @param {LoginForm} creds
   * @returns {Promise<void>}
   * @memberOf LoginFacade
   */
  async authenticate(creds: LoginForm): Promise<void> {
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

  get username(): string {
    return this.settingsService.getSettings().userSettings.username;
  }

  get rememberUsername(): boolean {
    const userSettings = this.settingsService.getSettings().userSettings;
    return userSettings.rememberUsername ? userSettings.rememberUsername : false;
  }

  get useBiometric(): boolean {
    return this.settingsService.getSettings().userSettings.useBiometric;
  }

  get bankIdentifier(): string {
    return this.settingsService.getSettings().userSettings.bankIdentifier;
  }

  get bankContactNumber(): string {
    const conatcts = this.settingsService.getSettings().userSettings.contacts;
    return conatcts && this.bankIdentifier ? conatcts[this.bankIdentifier] : '';
  }

  /**
   *
   * @summary Updating contact number into setting service as bankidentifier
   * @param {string} contactNumber
   * @memberof LoginFacade
   */
  setBankContactNumber(contactNumber: string): void {
    const userSettings = this.settingsService.getSettings().userSettings;
    const { contacts } = userSettings;
    const newContacts = { ...contacts, ...{ [this.bankIdentifier]: contactNumber } };
    userSettings.contacts = newContacts;
    this.settingsService.setUserSettings(userSettings);
  }

  /*
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
      case ApplicationProgress.CredentialsCreated:
        this.navigateToRoute('/signup/scanid');
        break;
      case ApplicationProgress.GeneralInfoCompleted:
        this.navigateToRoute('/signup/address-information');
        break;
      case ApplicationProgress.AddressInfoCompleted:
        this.navigateToRoute('/signup/beneficiary-information');
        break;
      case ApplicationProgress.BeneficiaryInfoCompleted:
        this.navigateToRoute('/signup/account-selection');
        break;
      case ApplicationProgress.AccountLevelSelected:
        if (member.accountLevel === AccountLevel.Full) {
          this.navigateToRoute('/signup/personal-information');
        } else {
          this.navigateToRoute('/signup/terms-conditions');
        }
        break;
      case ApplicationProgress.PersonalInfoCompleted:
        this.navigateToRoute('/signup/funding-information');
        break;
      case ApplicationProgress.FundSourceInfoCompleted:
        this.navigateToRoute('/signup/government-disclosure');
        break;
      case ApplicationProgress.GovDisclosureCompleted:
        this.navigateToRoute('/signup/identity-confirmation');
        break;
      case ApplicationProgress.IdentityConfirmationCompleted:
        this.navigateToRoute('/signup/terms-conditions');
        break;
      case ApplicationProgress.TermsAndConditionAccepted:
        this.navigateToRoute('/signup/account-funding');
        break;
      case ApplicationProgress.AccountFunded:
        this.navigateToRoute('/signup/account-funding');
        break;
      case ApplicationProgress.DirectDeposit:
        this.navigateToRoute('/signup/account-funding');
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
      this.authenticate(credentials);
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
   * @summary opens help action sheet
   *
   * @returns {Promise<void>}
   * @memberOf LoginFacade
   */
  async openHelpModal(): Promise<void> {
    let contactNumber = this.bankContactNumber;
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
            params: { contactNumber },
            cssClass: 'white-button',
            handler: () => {
              contactNumber = contactNumber.replace(/\s/g, '');
              if (contactNumber) {
                if (this.appPlatform.isIos || this.appPlatform.isAndroid) {
                  this.callService.callNumber(contactNumber, true);
                } else {
                  window.open(contactNumber, '_system');
                }
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

  get member(): IMember {
    return this.memberService.getCachedMember();
  }

  /**
   * Issue:MM3-300;
   * Getting contact form backend if bankidentifier is new that has no contact
   * number into usersettings
   * @memberof LoginFacade
   */
  getBankConatactNumber(): void {
    if (this.member && !this.bankContactNumber) {
      this.staticDataService.getBankSupportNumber().subscribe(contactNumber => {
        this.setBankContactNumber(contactNumber);
      });
    }
  }
}
