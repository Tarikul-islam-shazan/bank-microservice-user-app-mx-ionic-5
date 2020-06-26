/**
 * Facade: More page facade
 * Details: Change the Login with Face Id/TauchId with toggle button .
 * Date: 07/02/2020
 * Developer: Md.Kausar <md.kausar@brainstation23.com>
 * Include Ticket ID:GMA-4145
 */

import { Injectable } from '@angular/core';
import { SettingsService } from '@app/core/services/settings.service';
import { UserSettings } from '@app/core/models/app-settings';
import { ModalService, IMeedModalContent } from '@app/shared';
import { BiometricAuthenticationService } from '@app/core/services/biometric-authentication.service';
import { AppPlatform } from '@app/core';
import { IMoreMenuItem, IMoreMenuOption } from '@app/more/models/more';
import { Router } from '@angular/router';
import { LogoutService, LogoutReason } from '@app/core/services/logout.service';
@Injectable()
export class MoreFacade {
  isFaceIdOrTouchIDisEnabled: boolean;
  constructor(
    private settingsService: SettingsService,
    private modalService: ModalService,
    private biometricAuthenticationService: BiometricAuthenticationService,
    private appPlatform: AppPlatform,
    private router: Router,
    private logoutService: LogoutService
  ) {}

  /**
   * Update local storage value;
   * @memberof MoreFacade
   */
  updateIsFaceIdOrTouchIDisEnabled(): void {
    this.isFaceIdOrTouchIDisEnabled = this.isUsedBiometric;
  }
  /**
   * Checking biometric is available in device
   * @memberof MoreFacade
   */
  get isBiometricAvailable(): boolean {
    return this.biometricAuthenticationService.getBiometricIsAvailable();
  }
  /**
   * Geting Use Biometric from  UserSettings
   * @memberof MoreFacade
   */
  get isUsedBiometric(): boolean {
    return this.userSettings.useBiometric ? true : false;
  }
  /**
   * Geting user settings form  AppSettings through SettingsService
   * @memberof MoreFacade
   */
  get userSettings(): UserSettings {
    return this.settingsService.getSettings().userSettings;
  }

  /**
   * Disabled login with  Face id/touch id  otherwise show modal to enable
   * login with Face id/touch id from login screen.
   * @memberof MoreFacade
   */
  /**
   * Issue:  GMA-4859
   * Details:  Login: "Use Face/Touch ID" checkbox remains checked even though the user turns
   * off the "Sign in with Face/Touch ID" toggle under "More" menu.
   * Date: April 09, 2020
   * Developer: Raihan <raihanuzzaman@bs-23.net>
   */

  disableOrShowAlertBiometricLogin(): void {
    /**
     * From menu Face Id/Touch Id only set disable no way to enabled.
     * 1. Checking Face Id/Touch Id is enabled .
     * 2. If Enabled it set to desabled and updated settings otherwise showing info modal.
     */

    if (this.isUsedBiometric) {
      this.userSettings.useBiometric = this.isFaceIdOrTouchIDisEnabled;
      this.settingsService.setUserSettings(this.userSettings);
    } else {
      this.showFaceIdOrTouchIDAlertInfoModal();
    }
    setTimeout(() => {
      this.updateIsFaceIdOrTouchIDisEnabled();
    }, 100);
  }

  /**
   * Showing info modal using ModalService
   * @memberof MoreFacade
   */
  showFaceIdOrTouchIDAlertInfoModal(): void {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          details: ['more-module.biometric-modal-alert-message']
        }
      ],
      actionButtons: [
        {
          text: 'more-module.biometric-modal-alert-btn-cancel',
          cssClass: 'grey-outline-button',
          handler: () => this.modalService.close()
        }
      ]
    };
    this.modalService.openInfoModalComponent({ componentProps });
  }
  /**
   * * Summary: Create Logout confirmation modal
   * @memberof MoreFacade
   * Ticket: GMA-4643
   * Details: Dashboard: App getting crashed when user taps on the "Invite" and "More" menu ( modalservice close before navigate)
   * Date: March 04, 2020
   * Developer: Utpaul <Utpal.Sarker@brainstation23.com>
   */
  async openLogOutConfirmationModal() {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          details: ['more-module.logout-modal-confirmation-details']
        }
      ],
      actionButtons: [
        {
          text: 'more-module.logout-modal-yes-button',
          cssClass: 'white-button',
          handler: async () => {
            await this.modalService.close();
            // Set logout reason: user try manually log out and then redirect to login page
            this.logoutService.logoutReason = LogoutReason.ByUser;
            await this.router.navigateByUrl('login-user', { replaceUrl: true });
          }
        },
        {
          text: 'more-module.logout-modal-no-button',
          cssClass: 'grey-outline-button',
          handler: async () => {
            await this.modalService.close();
          }
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }
  /**
   * Checking Platform is Cordova or not
   * @memberof MoreFacade
   */
  get isCordova(): boolean {
    return this.appPlatform.isCordova();
  }
  /**
   * Checking Platform is Android
   * @memberof MoreFacade
   * Ticket: 4250
   * Details: Login Screen> For android device Touch ID should be shown instead of Face ID in Login Screen
   * Date: March 03, 2020
   * Developer: Utpaul <Utpal.Sarker@brainstation23.com>
   */
  get isAndroid(): boolean {
    return this.appPlatform.isAndroid();
  }
  /**
   * @method {profileMenuList} return getting profile menuList
   *
   * @readonly
   * @type {IMoreMenuItem}
   * @memberof MoreFacade
   *
   * Issue: GMA-4325
   * Details: [Web] remove touch/face id option from both place only for web version only
   * Date: February 26, 2020
   * @author: Utpal Sarker <utpal.sarker@brainstation23.com>
   */
  get profileMenuList(): IMoreMenuItem {
    return {
      optionName: 'more-module.more-page.profile',
      options: [
        {
          iconClass: 'icon-user',
          menuItemName: 'more-module.more-page.personal-details',
          route: 'more/personal-details',
          suppress: 'PersonalDetails',
          handler: (event: IMoreMenuOption) => {
            this.goTo(event.route);
          }
        },
        {
          iconClass: 'icon-bank',
          menuItemName: 'more-module.more-page.account-details',
          suppress: 'AccountDetails',
          route: 'more/account-info',
          handler: (event: IMoreMenuOption) => {
            this.goTo(event.route);
          }
        },
        {
          iconClass: 'icon-debit-card',
          menuItemName: 'more-module.more-page.debit-card',
          route: 'more/card',
          suppress: 'Card',
          handler: (event: IMoreMenuOption) => {
            this.goTo(event.route);
          }
        },
        {
          iconClass: 'icon-statement',
          menuItemName: 'more-module.more-page.statement',
          suppress: 'Statements',
          route: 'more/statements',
          handler: (event: IMoreMenuOption) => {
            this.goTo(event.route);
          }
        }
      ]
    };
  }
  /**
   * @method {preferencesMenuList} return getting preferences menuList
   * @readonly
   * @type {IMoreMenuItem}
   * @memberof MoreFacade
   * Ticket: GMA-4643
   * Details: Dashboard: App getting crashed when user taps on the "Invite" and "More" menu
   * ( isBiometricAvailable condition adding for check biometricAvailable or not)
   * Date: March 04, 2020
   * Developer: Utpaul <Utpal.Sarker@brainstation23.com>
   */
  get preferencesMenuList(): IMoreMenuItem {
    return {
      optionName: 'more-module.more-page.preferences',
      options: [
        {
          iconClass: 'icon-setting',
          menuItemName: 'more-module.more-page.settings',
          route: 'more/settings',
          suppress: 'Settings',
          handler: (event: IMoreMenuOption) => {
            this.goTo(event.route);
          }
        },
        {
          // Ticket: GMA-4684, Problem: Face ID label text not showing according to invision in android
          iconClass: 'icon-faceid',
          menuItemName: this.isAndroid
            ? 'more-module.more-page.sign-in-with-touch-id'
            : 'more-module.more-page.sign-in-with-face-or-touch-id',
          route: 'face-id',
          isNativeFeatureAvailable: this.isBiometricAvailable,
          isNative: !this.isCordova,
          handler: (event: IMoreMenuOption) => {}
        }
      ]
    };
  }
  /**
   * @method {preferencesMenuList} return getting help menuList
   *
   * @readonly
   * @type {IMoreMenuItem}
   * @memberof MoreFacade
   */
  get helpMenuList(): IMoreMenuItem {
    return {
      optionName: 'more-module.more-page.help-or-support',
      options: [
        {
          iconClass: 'icon-atm',
          menuItemName: 'more-module.more-page.atm-finder',
          suppress: 'ATMFinder',
          route: 'more/atm-finder',
          handler: (event: IMoreMenuOption) => {
            this.goTo(event.route);
          }
        },
        {
          iconClass: 'icon-privacy',
          menuItemName: 'more-module.more-page.privacy-legal',
          route: 'more/privacy-legal',
          suppress: 'PrivacyAndLegal',
          handler: (event: IMoreMenuOption) => {
            this.goTo(event.route);
          }
        },
        {
          iconClass: 'icon-envelope',
          menuItemName: 'more-module.more-page.message-center',
          route: 'more/message-center',
          suppress: 'MessageCenter',
          handler: (event: IMoreMenuOption) => {
            this.goTo(event.route);
          }
        },
        {
          iconClass: 'icon-chat',
          menuItemName: 'more-module.more-page.contact-us',
          route: 'more/contact-us',
          suppress: 'ContactUs',
          handler: (event: IMoreMenuOption) => {
            this.goTo(event.route);
          }
        },
        {
          iconClass: 'icon-logout',
          menuItemName: 'more-module.more-page.log-out',
          route: 'login-user',
          handler: async (event: IMoreMenuOption) => {
            await this.openLogOutConfirmationModal();
          }
        }
      ]
    };
  }
  /**
   * @method {moreMenuList} return more menu list which is bind in html
   *
   * @readonly
   * @type {IMoreMenuItem[]}
   * @memberof MoreFacade
   */
  get moreMenuList(): IMoreMenuItem[] {
    const preferenceMenuList = this.preferencesMenuList;
    preferenceMenuList.options = this.preferencesMenuList.options.filter((option: IMoreMenuOption) => {
      return !option.isNative;
    });
    return [this.profileMenuList, preferenceMenuList, this.helpMenuList];
  }
  /**
   * @method {goTo} which navigate one page to another
   *
   * @param {string} route
   * @memberof MoreFacade
   */
  goTo(route: string) {
    this.router.navigate([route]);
  }

  getLabelClass(route: string): string {
    return route === 'login-user' ? 'red-text' : 'regular-text';
  }
}
