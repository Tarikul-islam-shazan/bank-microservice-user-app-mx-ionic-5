import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PAGES } from '@app/core';

export const SIGNUP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'email'
  },
  {
    path: 'email',
    data: { title: PAGES.SIGNUP_EMAIL.NAME },
    loadChildren: () => import('./signup-email/signup-email.module').then(m => m.SignupEmailPageModule)
  },
  {
    path: 'log-in-success',
    loadChildren: () => import('./log-in-success/log-in-success.module').then(m => m.LogInSuccessPageModule)
  },
  {
    path: 'compressed',
    data: { title: PAGES.SIGNUP_COMPRESSED.NAME },
    loadChildren: () => import('./signup-compressed/signup-compressed.module').then(m => m.SignupCompressedPageModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./verification/verification.module').then(m => m.VerificationPageModule)
  },
  {
    path: 'personal',
    data: { title: PAGES.SIGNUP_PERSONAL.NAME },
    loadChildren: () => import('./personal/personal.module').then(m => m.PersonalPageModule)
  },
  {
    path: 'address',
    data: { title: PAGES.SIGNUP_ADDRESS.NAME },
    loadChildren: () => import('./address/address.module').then(m => m.AddressPageModule)
  },
  {
    path: 'confirm-identity',
    data: { title: PAGES.SIGNUP_CONFIRM_IDENTITY.NAME },
    loadChildren: () => import('./confirm-identity/confirm-identity.module').then(m => m.ConfirmIdentityPageModule)
  },
  {
    path: 'create-login',
    data: { title: PAGES.SIGNUP_CREATE_LOGIN.NAME },
    loadChildren: () => import('./create-login/create-login.module').then(m => m.CreateLoginPageModule)
  },
  {
    path: 'identity-verification',
    data: { title: PAGES.SIGNUP_IDENTITY_VERIFICATION.NAME },
    loadChildren: () =>
      import('./identity-verification/identity-verification.module').then(m => m.IdentityVerificationPageModule)
  },
  {
    path: 'terms-conditions',
    data: { title: PAGES.SIGNUP_TERMS_CONDITIONS.NAME },
    loadChildren: () => import('./terms-conditions/terms-conditions.module').then(m => m.TermsConditionsPageModule)
  },
  {
    path: 'scanid',
    data: { title: PAGES.SIGNUP_SCANID.NAME },
    loadChildren: () => import('./scan-id/scan-id.module').then(m => m.ScanIDPageModule)
  },
  {
    path: 'deposit',
    loadChildren: () => import('@app/deposit/deposit.module').then(m => m.DepositModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then(m => m.IntroPageModule)
  },
  {
    path: 'general-information',
    data: { title: PAGES.SIGNUP_GENERAL_INFORMATION },
    loadChildren: () =>
      import('./general-information/general-information.module').then(m => m.GeneralInformationPageModule)
  },
  {
    path: 'address-information',
    data: { title: PAGES.SIGNUP_ADDRESS_INFORMATION.NAME },
    loadChildren: () =>
      import('./address-information/address-information.module').then(m => m.AddressInformationPageModule)
  },
  {
    path: 'personal-information',
    loadChildren: () =>
      import('./personal-information/personal-information.module').then(m => m.PersonalInformationPageModule)
  },
  {
    path: 'beneficiary-information',
    data: { title: PAGES.SIGNUP_BENEFICIARY.NAME },
    loadChildren: () =>
      import('./beneficiary-information/beneficiary-information.module').then(m => m.BeneficiaryInformationPageModule)
  },
  {
    path: 'account-selection',
    data: { title: PAGES.SIGNUP_ACCOUNT_SELECTION.NAME },
    loadChildren: () => import('./account-selection/account-selection.module').then(m => m.AccountSelectionPageModule)
  },
  {
    path: 'identity-confirmation',
    loadChildren: () =>
      import('./identity-confirmation/identity-confirmation.module').then(m => m.IdentityConfirmationPageModule)
  },
  {
    path: 'funding-information',
    loadChildren: () =>
      import('./funding-information/funding-information.module').then(m => m.FundingInformationPageModule)
  },
  {
    path: 'government-disclosure',
    data: { title: PAGES.SIGNUP_GOVERNMENT_DISCLOSURE.NAME },
    loadChildren: () =>
      import('./government-disclosure/government-disclosure.module').then(m => m.GovernmentDisclosurePageModule)
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(SIGNUP_ROUTES)],
  exports: [RouterModule]
})
export class SignupRoutingModule {}
