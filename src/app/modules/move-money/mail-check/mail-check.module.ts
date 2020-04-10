import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { Routes, RouterModule } from '@angular/router';
import { PAGES } from '@app/core';
import { OtpVerificationModalPageModule } from '@app/shared/components/otp-verification-modal/otp-verification-modal.module';
import { NgxMaskModule } from 'ngx-mask';
import { MailCheckPage } from './container/mail-check.page';
import { MailCheckFacade } from './facade';
import { AddPayeePage } from './add-payee/container/add-payee.page';
import { AddPayeeAddressPage } from './add-payee-address/container/add-payee-address.page';
import { BillPaymentPage } from './bill-payment/container/bill-payment.page';
import { AddPayeeAddressPageModule } from './add-payee-address/add-payee-address.module';
import { AddPayeePageModule } from './add-payee/add-payee.module';
import { BillPaymentPageModule } from './bill-payment/bill-payment.module';

const routes: Routes = [
  {
    path: '',
    data: { title: PAGES.MAIL_CHECK.NAME },
    component: MailCheckPage
  },
  {
    path: 'add-payee',
    data: { title: PAGES.ADD_PAYEE.NAME },
    component: AddPayeePage
  },
  {
    path: 'add-payee-address',
    data: { title: PAGES.BILL_PAY.NAME },
    component: AddPayeeAddressPage
  },
  {
    path: 'bill-payment',
    data: { title: PAGES.BILL_PAYMENT.NAME },
    component: BillPaymentPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    NgxMaskModule.forRoot(),
    OtpVerificationModalPageModule,
    AddPayeeAddressPageModule,
    AddPayeePageModule,
    BillPaymentPageModule
  ],
  entryComponents: [MailCheckPage],
  providers: [MailCheckFacade],
  declarations: [MailCheckPage]
})
export class MailCheckModule {}
