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
    path: 'deposit',
    loadChildren: () => import('@app/deposit/deposit.module').then(m => m.DepositModule)
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoveMoneyRoutingModule {}
