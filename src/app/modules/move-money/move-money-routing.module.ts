import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PAGES } from '@app/core';
import { MoveMoneyPage } from './home/container/move-money.page';

const routes: Routes = [
  {
    path: '',
    data: { title: PAGES.MOVE_MONEY.NAME },
    component: MoveMoneyPage
  },
  {
    path: 'internal-transfer',
    data: { title: PAGES.MOVE_BETWEEN_ACCOUNTS.NAME },
    loadChildren: () =>
      import('@app/move-money/internal-transfer/internal-transfer.module').then(m => m.InternalTransferModule)
  },
  {
    path: 'transfer-from-other-bank',
    data: { title: PAGES.TRANSFER_FROM_OTHER_BANK.NAME },
    loadChildren: () =>
      import('./transfer-from-other-bank/transfer-from-other-bank.module').then(m => m.TransferFromOtherBankPageModule)
  },
  {
    path: 'deposit',
    loadChildren: () => import('@app/deposit/deposit.module').then(m => m.DepositModule)
  },
  {
    path: 'credit-debit-card',
    data: { title: PAGES.MOVE_BETWEEN_ACCOUNTS.NAME },
    loadChildren: () => import('./credit-debit-card/credit-debit-card.module').then(m => m.CreditDebitCardPageModule)
  },
  {
    path: 'pay-bills',
    data: { title: PAGES.PAY_BILLS.NAME },
    loadChildren: () => import('./pay-bills/pay-bills.module').then(m => m.PayBillsPageModule)
  },
  {
    path: 'send-money',
    data: { title: PAGES.SEND_MONEY.NAME },
    loadChildren: () => import('@app/move-money/send-money/send-money.module').then(m => m.SendMoneyModule)
  },
  {
    path: 'request-money',
    data: { title: PAGES.REQUEST_MONEY.NAME },
    loadChildren: () => import('@app/move-money/request-money/request-money.module').then(m => m.RequestMoneyModule)
  },
  {
    path: 'send-money-internationally',
    data: { title: PAGES.SEND_MONEY_INTERNATIONALLY.NAME },
    loadChildren: () =>
      import('./send-money-internationally/send-money-internationally.module').then(
        m => m.SendMoneyInternationallyPageModule
      )
  },
  {
    path: 'add-payee',
    loadChildren: () => import('./mail-check/add-payee/add-payee.module').then(m => m.AddPayeePageModule)
  },
  {
    path: 'add-payee-address',
    loadChildren: () =>
      import('./mail-check/add-payee-address/add-payee-address.module').then(m => m.AddPayeeAddressPageModule)
  },
  {
    path: 'bill-payment',
    loadChildren: () => import('./mail-check/bill-payment/bill-payment.module').then(m => m.BillPaymentPageModule)
  },
  {
    path: 'mail-check',
    loadChildren: () => import('./mail-check/mail-check.module').then(m => m.MailCheckModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoveMoneyRoutingModule {}
