import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { PAGES } from '@app/core/models/constants';
import { PayBillsHomePage } from '@app/move-money/pay-bills/home/container/home.page';
import { PayBillsHomeFacade } from '@app/move-money/pay-bills/home/facade/facade';

import { BillerDirectPage } from '@app/move-money/pay-bills/biller-direct/container/biller-direct.page';
import { CardSwapPage } from '@app/move-money/pay-bills/card-swap/container/card-swap.page';
import { BillPayPage } from './bill-pay/container/bill-pay.page';
import { BillPayPageModule } from './bill-pay/bill-pay.module';
import { BillPaymentPage } from './bill-pay/bill-payment/container/bill-payment.page';
import { BillPaymentPageModule } from './bill-pay/bill-payment/bill-payment.module';
import { AddPayeePage } from './bill-pay/add-payee/container/add-payee.page';
import { AddPayeePageModule } from './bill-pay/add-payee/add-payee.module';
import { EditPayeePageModule } from './bill-pay/edit-payee/add-payee.module';
import { EditPayeePage } from './bill-pay/edit-payee/container/edit-payee.page';
import { BillerDirectFacade } from './biller-direct/facade/facade';
import { TopUpMobilePage } from './top-up-mobile/container/top-up-mobile.page';
import { TopUpMobilePageModule } from './top-up-mobile/top-up-mobile.module';
import { AddTopUpPayeePageModule } from './top-up-mobile/add-top-up-payee/add-top-up-payee.module';
import { AddTopUpPayeePage } from './top-up-mobile/add-top-up-payee/container/add-top-up-payee.page';
import { TopUpPaymentPage } from './top-up-mobile/top-up-payment/container/top-up-payment.page';
import { TopUpPaymentPageModule } from './top-up-mobile/top-up-payment/top-up-payment.module';
import { GiftCardPage } from './gift-card/container/gift-card.page';
import { GiftCardPageModule } from './gift-card/gift-card.module';
export const PAGE_CONTAINERS: any[] = [PayBillsHomePage, BillerDirectPage, CardSwapPage];
export const ALL_FACADES: any[] = [PayBillsHomeFacade, BillerDirectFacade]; // BillerDirectFacade facade injected

const routes: Routes = [
  {
    path: '',
    component: PayBillsHomePage
  },
  {
    path: 'biller-direct',
    data: { title: PAGES.BILLER_DIRECR.NAME },
    component: BillerDirectPage
  },
  {
    path: 'card-swap',
    data: { title: PAGES.CARD_SWAP.NAME },
    component: CardSwapPage
  },
  {
    path: 'bill-pay',
    data: { title: PAGES.BILL_PAY.NAME },
    component: BillPayPage
  },
  {
    path: 'add-payee',
    data: { title: PAGES.ADD_PAYEE.NAME },
    component: AddPayeePage
  },
  {
    path: 'edit-payee',
    data: { title: PAGES.EDIT_PAYEE.NAME },
    component: EditPayeePage
  },
  {
    path: 'bill-payment',
    data: { title: PAGES.BILL_PAYMENT.NAME },
    component: BillPaymentPage
  },
  {
    path: 'top-up-mobile',
    data: { title: PAGES.TOP_UP_MOBILE.NAME },
    component: TopUpMobilePage
  },
  {
    path: 'add-top-up-payee',
    data: { title: PAGES.ADD_TOP_UP_PAYEE.NAME },
    component: AddTopUpPayeePage
  },
  {
    path: 'gift-card',
    data: { title: PAGES.GIFT_CARD },
    component: GiftCardPage
  },
  {
    path: 'top-up-payment',
    data: { title: PAGES.TOP_UP_PAYMENT.NAME },
    component: TopUpPaymentPage
  }
];
@NgModule({
  entryComponents: [],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    BillPayPageModule,
    AddPayeePageModule,
    EditPayeePageModule,
    BillPaymentPageModule,
    TopUpMobilePageModule,
    AddTopUpPayeePageModule,
    TopUpPaymentPageModule,
    GiftCardPageModule
  ],
  declarations: [...PAGE_CONTAINERS],
  providers: [...ALL_FACADES]
})
export class PayBillsPageModule {}
