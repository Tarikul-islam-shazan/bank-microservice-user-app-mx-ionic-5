/**
 * Feature: Send money module
 * Details: p2p send money to meed members or ipay members. Send money to fund request. Manage alreay paid contacts.
 * Date: January 30, 2020
 * Developer: Sanitul <sanitul@bs-23.com>
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { PAGES } from '@app/core/models/constants';
import { OtpVerificationModalPageModule } from '@app/shared/components/otp-verification-modal/otp-verification-modal.module';
import { OtpModalComponentModule } from '@app/shared/components/otp-modal/otp-modal.module';
import {
  ALL_FACADES,
  PAGE_CONTAINERS,
  COMPONENTS,
  PIPES,
  HomePage,
  EditPage,
  ConfirmPage,
  ContactModifyPage,
  RequestDetailsPage
} from '@app/move-money/send-money';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'edit',
    data: { title: PAGES.SEND_MONEY_EDIT.NAME },
    component: EditPage
  },
  {
    path: 'confirm',
    data: { title: PAGES.SEND_MONEY_CONFIRM.NAME },
    component: ConfirmPage
  },
  {
    path: 'contact-modify',
    data: { title: PAGES.SEND_MONEY_CONTACT_MODIFY.NAME },
    component: ContactModifyPage
  },
  {
    path: 'request-details',
    data: { title: PAGES.SEND_MONEY_REQUEST_DETAILS.NAME },
    component: RequestDetailsPage
  },
  {
    path: 'ipay',
    data: { title: PAGES.SEND_MONEY_CONFIRM.NAME },
    loadChildren: () => import('@app/move-money/send-money/ipay/ipay.module').then(m => m.IpayModule)
  }
];

@NgModule({
  entryComponents: [...COMPONENTS],
  imports: [SharedModule, RouterModule.forChild(routes), OtpVerificationModalPageModule, OtpModalComponentModule],
  declarations: [...PAGE_CONTAINERS, ...COMPONENTS, PIPES],
  providers: [...ALL_FACADES]
})
export class SendMoneyModule {}
