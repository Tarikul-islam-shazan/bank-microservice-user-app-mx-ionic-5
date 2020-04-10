/**
 * Feature: Settings module
 * Details: change language, update and get contact preference, show version info etc.
 * Date: February, 10th 2020
 * Developer: Sudipta <sudipta.ghosh@bs-23.net>
 */

import { NgModule } from '@angular/core';
import { SharedModule, SuccessModalPage } from '@app/shared';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './container/settings.page';
import { ChangeLanguagePage } from './change-language/container';
import { CHANGE_LANGUAGE_FACADE_SERVICE } from './change-language/facade';
import { ContactPreferencesPage } from './contact-preferences/container';
import { CONTACT_PREFERENCES_FACADE_SERVICE } from './contact-preferences/facade';
import { VersionInfoPage } from './version-info/container';
import { VERSION_INFO_FACADE_SERVICE } from './version-info/facade';
import { OtpVerificationModalPageModule } from '@app/shared/components/otp-verification-modal/otp-verification-modal.module';
import { SweepPage } from './sweep/container';
import { SWEEP_FACADE_SERVICE } from './sweep/facade';
import { CHANGE_PASSWORD_FACADE_SERVICE } from './change-password/facade';
import { ChangePasswordPage } from './change-password/container';
import { SuccessModalPageModule } from '@app/shared/components/success-modal/success-modal.module';
import { PASSWORD_SERVICE } from './change-password/services';

@NgModule({
  imports: [SettingsPageRoutingModule, SharedModule, OtpVerificationModalPageModule, SuccessModalPageModule],
  declarations: [
    SettingsPage,
    ChangeLanguagePage,
    ContactPreferencesPage,
    VersionInfoPage,
    SweepPage,
    ChangePasswordPage
  ],
  providers: [
    ...CHANGE_LANGUAGE_FACADE_SERVICE,
    ...CONTACT_PREFERENCES_FACADE_SERVICE,
    ...VERSION_INFO_FACADE_SERVICE,
    ...SWEEP_FACADE_SERVICE,
    ...CHANGE_PASSWORD_FACADE_SERVICE,
    ...PASSWORD_SERVICE
  ]
})
export class SettingsPageModule {}
